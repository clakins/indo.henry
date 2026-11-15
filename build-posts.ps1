# build-posts.ps1
# Turns the Obsidian notes in your notes folder into blog posts.
# Runs automatically from publish.bat -- you never need to run it by hand.
#
# What it does, every time:
#   1. Reads every .md note in the notes folder (only those marked draft: false)
#   2. Pulls the title + date from the note's properties
#   3. Converts the text, photos, videos and captions into post HTML
#   4. Copies (and shrinks) any photos you used into /photos
#   5. Writes posts-generated.js, which the site loads after posts.js
#
# Your old posts in posts.js are untouched. Notes are added alongside them.

param([string]$NotesDir = "", [string]$MediaDir = "")

# ===================== SETTINGS =====================
$siteDir = $PSScriptRoot

# Your Obsidian vault, and the folder inside it that holds blog post notes.
$vaultRoot = "C:\Users\photo\Documents\Henry's Sync Vault"
if ([string]::IsNullOrWhiteSpace($NotesDir)) { $NotesDir = Join-Path $vaultRoot "Logs\Blog Posts" }

# Photos you paste into a note are found by name: first inside the blog folder,
# then anywhere else in the vault (so your normal Obsidian attachment settings
# keep working). Nothing is published unless a post actually uses it.
if ([string]::IsNullOrWhiteSpace($MediaDir)) { $MediaDir = $vaultRoot }

$photosDir   = Join-Path $siteDir "photos"
$outFile     = Join-Path $siteDir "posts-generated.js"
$maxEdge     = 1600      # photos are shrunk so the longest side is at most this many pixels
$jpegQuality = 85
$resizeBytes = 1500000   # JPEGs under ~1.5 MB and under max size are copied as-is

$imgExt = @('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg')
$vidExt = @('.mp4', '.webm', '.mov', '.m4v')
$audExt = @('.mp3', '.wav', '.m4a', '.ogg')
# ====================================================

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$script:warnCount = 0
$script:noteIndex = @{}
$script:photoIndex = @{}

function Warn([string]$msg) {
    $script:warnCount++
    Write-Host "  [!] $msg" -ForegroundColor Yellow
}

# ---------- escaping for the generated JavaScript ----------
function Escape-JsString([string]$s) {
    return $s.Replace('\', '\\').Replace('"', '\"').Replace("`r", '').Replace("`n", ' ')
}
function Escape-JsTemplate([string]$s) {
    return $s.Replace('\', '\\').Replace('`', '\`').Replace('${', '\${')
}

# ---------- note properties (the --- block at the top) ----------
function Parse-Note([string]$raw) {
    $text = $raw.Replace("`r`n", "`n").Replace("`r", "`n").TrimStart([char]0xFEFF)
    $meta = @{}
    $body = $text
    $fmMatch = [regex]::Match($text, '(?s)\A---[ \t]*\n(.*?)\n---[ \t]*(\n|\z)')
    if ($fmMatch.Success) {
        $body = $text.Substring($fmMatch.Length)
        foreach ($line in ($fmMatch.Groups[1].Value -split "`n")) {
            $kv = [regex]::Match($line, '^\s*([A-Za-z_][\w-]*)\s*:\s*(.*?)\s*$')
            if ($kv.Success) {
                $val = $kv.Groups[2].Value.Trim()
                if ($val.Length -ge 2) {
                    $first = $val.Substring(0, 1)
                    $last = $val.Substring($val.Length - 1, 1)
                    if (($first -eq '"' -and $last -eq '"') -or ($first -eq "'" -and $last -eq "'")) {
                        $val = $val.Substring(1, $val.Length - 2)
                    }
                }
                $meta[$kv.Groups[1].Value.ToLower()] = $val
            }
        }
    }
    return @{ Meta = $meta; Body = $body }
}

# ---------- inline formatting: bold, italic, links, code ----------
function Convert-Inline([string]$s) {
    $open  = [string][char]0xE000
    $close = [string][char]0xE001
    $codes = @()

    # protect `code` first so nothing inside it gets formatted
    $m = [regex]::Match($s, '`([^`\n]+)`')
    while ($m.Success) {
        $codes += $m.Groups[1].Value
        $token = $open + ($codes.Count - 1) + $close
        $s = $s.Remove($m.Index, $m.Length).Insert($m.Index, $token)
        $m = [regex]::Match($s, '`([^`\n]+)`')
    }

    # Obsidian [[links]] just become plain text on the site
    $s = [regex]::Replace($s, '\[\[([^\]|]+)\|([^\]]+)\]\]', '$2')
    $s = [regex]::Replace($s, '\[\[([^\]]+)\]\]', '$1')

    # [text](url)
    $s = [regex]::Replace($s, '\[([^\]]+)\]\((\S+?)(?:\s+"[^"]*")?\)', '<a href="$2">$1</a>')

    # **bold**, *italic*, _italic_, ~~strike~~
    $s = [regex]::Replace($s, '\*\*(?=\S)(.+?)(?<=\S)\*\*', '<strong>$1</strong>')
    $s = [regex]::Replace($s, '(?<![\w])__(?=\S)(.+?)(?<=\S)__(?!\w)', '<strong>$1</strong>')
    $s = [regex]::Replace($s, '(?<![\*\w])\*(?=[^\s\*])(.+?)(?<=[^\s\*])\*(?![\*\w])', '<em>$1</em>')
    $s = [regex]::Replace($s, '(?<![\w])_(?=[^\s_])(.+?)(?<=[^\s_])_(?!\w)', '<em>$1</em>')
    $s = [regex]::Replace($s, '~~(?=\S)(.+?)(?<=\S)~~', '<del>$1</del>')

    # bare web addresses become links
    $s = [regex]::Replace($s, '(?<![\w"''=>/])(https?://[^\s<>"]*[^\s<>".,;:!?)\]''])', '<a href="$1">$1</a>')

    for ($i = 0; $i -lt $codes.Count; $i++) {
        $c = $codes[$i].Replace('&', '&amp;').Replace('<', '&lt;').Replace('>', '&gt;')
        $s = $s.Replace(($open + $i + $close), "<code>$c</code>")
    }
    return $s
}

# ---------- find a photo/video, copy it into /photos, return its web path ----------
function Save-Resized([string]$srcPath, [string]$destPath, [string]$ext, [long]$length) {
    Add-Type -AssemblyName System.Drawing
    $img = [System.Drawing.Image]::FromFile($srcPath)
    try {
        $longest = [Math]::Max($img.Width, $img.Height)
        $small = ($longest -le $maxEdge)
        if ($small -and ($ext -eq '.png' -or $length -le $resizeBytes)) {
            Copy-Item -LiteralPath $srcPath -Destination $destPath -Force
            return
        }
        # phones store rotation in a tag; apply it so photos aren't sideways
        if ($img.PropertyIdList -contains 274) {
            $orient = [int]$img.GetPropertyItem(274).Value[0]
            if ($orient -eq 3) { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
            elseif ($orient -eq 6) { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
            elseif ($orient -eq 8) { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
        }
        $w = $img.Width
        $h = $img.Height
        $scale = 1.0
        if ($longest -gt $maxEdge) { $scale = $maxEdge / [double]$longest }
        $nw = [int][Math]::Round($w * $scale)
        $nh = [int][Math]::Round($h * $scale)
        $bmp = New-Object System.Drawing.Bitmap -ArgumentList $nw, $nh
        try {
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $g.DrawImage($img, 0, 0, $nw, $nh)
            $g.Dispose()
            if ($ext -eq '.png') {
                $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
            } else {
                $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
                $params = New-Object System.Drawing.Imaging.EncoderParameters -ArgumentList 1
                $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter -ArgumentList @([System.Drawing.Imaging.Encoder]::Quality, [long]$jpegQuality)
                $bmp.Save($destPath, $codec, $params)
            }
        } finally {
            $bmp.Dispose()
        }
    } finally {
        $img.Dispose()
    }
}

function Stage-Media([string]$name, [string]$kind) {
    $key = $name.ToLower()

    if ($script:noteIndex.ContainsKey($key)) {
        $srcPath = $script:noteIndex[$key]
        $srcInfo = Get-Item -LiteralPath $srcPath
        $safe = ($name -replace '[^A-Za-z0-9._-]+', '-')
        $destPath = Join-Path $photosDir $safe
        $needsCopy = $true
        if (Test-Path -LiteralPath $destPath) {
            if ((Get-Item -LiteralPath $destPath).LastWriteTime -ge $srcInfo.LastWriteTime) { $needsCopy = $false }
        }
        if ($needsCopy) {
            if (-not (Test-Path -LiteralPath $photosDir)) { New-Item -ItemType Directory -Path $photosDir | Out-Null }
            $sizeMB = [Math]::Round($srcInfo.Length / 1MB, 1)
            if ($kind -ne 'image') {
                if ($srcInfo.Length -gt 95MB) {
                    Warn "$name is $sizeMB MB. GitHub rejects files over 100 MB, so it was NOT copied. Compress it first."
                    return $null
                }
                if ($srcInfo.Length -gt 40MB) { Warn "$name is $sizeMB MB. That is big for a web page; consider compressing it." }
                Copy-Item -LiteralPath $srcPath -Destination $destPath -Force
            } else {
                $ext = $srcInfo.Extension.ToLower()
                $done = $false
                if ($ext -eq '.jpg' -or $ext -eq '.jpeg' -or $ext -eq '.png') {
                    try {
                        Save-Resized $srcPath $destPath $ext $srcInfo.Length
                        $done = $true
                    } catch {
                        Warn "Could not shrink $name ($($_.Exception.Message)). Copied the original instead."
                    }
                }
                if (-not $done) { Copy-Item -LiteralPath $srcPath -Destination $destPath -Force }
            }
            $outMB = [Math]::Round((Get-Item -LiteralPath $destPath).Length / 1MB, 2)
            Write-Host "  + photos/$safe ($outMB MB)"
        }
        return ('photos/' + [uri]::EscapeDataString($safe))
    }

    if ($script:photoIndex.ContainsKey($key)) {
        return ('photos/' + [uri]::EscapeDataString($script:photoIndex[$key]))
    }

    Warn "Could not find '$name' in your notes folder or in /photos."
    return $null
}

# ---------- ![[photo.jpg|caption]] and ![caption](photo.jpg) ----------
function Convert-Embed([string]$target, [string]$altText) {
    $caption = ''
    foreach ($p in ($altText -split '\|')) {
        $p = $p.Trim()
        if ($p -eq '') { continue }
        if ($p -match '^\d+(x\d+)?$') { continue }   # |300 is an Obsidian size, not a caption
        $caption = $p
    }

    $name = ($target.Trim() -split '#')[0]
    try { $name = [uri]::UnescapeDataString($name) } catch { }
    $name = [System.IO.Path]::GetFileName($name.Replace('\', '/')).Trim()
    $ext = [System.IO.Path]::GetExtension($name).ToLower()

    $kind = $null
    if ($imgExt -contains $ext) { $kind = 'image' }
    elseif ($vidExt -contains $ext) { $kind = 'video' }
    elseif ($audExt -contains $ext) { $kind = 'audio' }
    if (-not $kind) {
        Warn "Can't show '$name' on a web page (unsupported file type)."
        return "<!-- unsupported file: $name -->"
    }
    if ($ext -eq '.mov') { Warn "$name is a .mov file. Some browsers won't play it; an .mp4 is safer." }

    $src = Stage-Media $name $kind
    if (-not $src) { return "<!-- missing file: $name -->" }

    $altPlain = [regex]::Replace((Convert-Inline $caption), '<[^>]+>', '')
    $altAttr = $altPlain.Replace('"', '&quot;')
    if ($kind -eq 'image') {
        $tag = '<img class="post-photo" src="' + $src + '" alt="' + $altAttr + '">'
    } elseif ($kind -eq 'video') {
        $tag = '<video class="post-photo" controls preload="metadata" src="' + $src + '"></video>'
    } else {
        $tag = '<audio class="post-photo" controls src="' + $src + '"></audio>'
    }
    if ($caption -ne '') {
        $tag = $tag + "`n" + '<p class="post-photo-caption">' + (Convert-Inline $caption) + '</p>'
    }
    return $tag
}

# ---------- the body of the note, block by block ----------
function Convert-Body([string]$body) {
    $out = New-Object System.Collections.ArrayList
    $st = @{ Para = @(); Quote = @(); List = @(); ListType = '' }

    function Flush-Para {
        if ($st.Para.Count -gt 0) {
            $joined = ($st.Para -join "`n")
            if ($joined -match '^\s*<(video|img|iframe|div|ul|ol|table|hr|blockquote|figure|audio|h[1-6]|pre|section|p)[\s>/]') {
                [void]$out.Add($joined)
            } else {
                $html = (Convert-Inline $joined).Replace("`n", "<br>`n")
                [void]$out.Add('<p>' + $html + '</p>')
            }
            $st.Para = @()
        }
    }
    function Flush-Quote {
        if ($st.Quote.Count -gt 0) {
            $html = (Convert-Inline ($st.Quote -join "`n")).Replace("`n", "<br>`n")
            [void]$out.Add('<blockquote><p>' + $html + '</p></blockquote>')
            $st.Quote = @()
        }
    }
    function Flush-List {
        if ($st.List.Count -gt 0) {
            $tag = $st.ListType
            $items = ($st.List | ForEach-Object { '<li>' + (Convert-Inline $_) + '</li>' }) -join "`n"
            [void]$out.Add("<$tag>`n$items`n</$tag>")
            $st.List = @()
            $st.ListType = ''
        }
    }
    function Flush-All { Flush-Para; Flush-Quote; Flush-List }

    $inFence = $false
    $fenceLines = @()

    foreach ($line in ($body -split "`n")) {
        if ($inFence) {
            if ($line -match '^\s*```') {
                $code = ($fenceLines -join "`n").Replace('&', '&amp;').Replace('<', '&lt;').Replace('>', '&gt;')
                [void]$out.Add('<pre><code>' + $code + '</code></pre>')
                $inFence = $false
                $fenceLines = @()
            } else { $fenceLines += $line }
            continue
        }
        if ($line -match '^\s*```') { Flush-All; $inFence = $true; continue }

        if ($line -match '^\s*$') { Flush-All; continue }

        $m = [regex]::Match($line, '^\s*!\[\[(.+?)\]\]\s*$')
        if ($m.Success) {
            Flush-All
            $inner = $m.Groups[1].Value
            $bar = $inner.IndexOf('|')
            if ($bar -ge 0) { [void]$out.Add((Convert-Embed $inner.Substring(0, $bar) $inner.Substring($bar + 1))) }
            else { [void]$out.Add((Convert-Embed $inner '')) }
            continue
        }
        $m = [regex]::Match($line, '^\s*!\[([^\]]*)\]\((.+?)\)\s*$')
        if ($m.Success) {
            Flush-All
            [void]$out.Add((Convert-Embed $m.Groups[2].Value $m.Groups[1].Value))
            continue
        }

        if ($line -match '^\s*(-{3,}|\*{3,}|_{3,})\s*$') { Flush-All; [void]$out.Add('<hr>'); continue }

        $m = [regex]::Match($line, '^(#{1,6})\s+(.+?)\s*#*\s*$')
        if ($m.Success) {
            Flush-All
            $lvl = 3
            if ($m.Groups[1].Value.Length -ge 3) { $lvl = 4 }
            [void]$out.Add("<h$lvl>" + (Convert-Inline $m.Groups[2].Value) + "</h$lvl>")
            continue
        }

        $m = [regex]::Match($line, '^\s*>\s?(.*)$')
        if ($m.Success) {
            Flush-Para; Flush-List
            $st.Quote += $m.Groups[1].Value
            continue
        }

        $m = [regex]::Match($line, '^\s*[-*+]\s+(.+)$')
        if ($m.Success) {
            Flush-Para; Flush-Quote
            if ($st.ListType -ne 'ul') { Flush-List; $st.ListType = 'ul' }
            $st.List += $m.Groups[1].Value
            continue
        }
        $m = [regex]::Match($line, '^\s*\d+[.)]\s+(.+)$')
        if ($m.Success) {
            Flush-Para; Flush-Quote
            if ($st.ListType -ne 'ol') { Flush-List; $st.ListType = 'ol' }
            $st.List += $m.Groups[1].Value
            continue
        }

        Flush-Quote; Flush-List
        $st.Para += $line.TrimEnd()
    }
    if ($inFence) {
        $code = ($fenceLines -join "`n").Replace('&', '&amp;').Replace('<', '&lt;').Replace('>', '&gt;')
        [void]$out.Add('<pre><code>' + $code + '</code></pre>')
    }
    Flush-All
    return ($out -join "`n")
}

# =========================== MAIN ===========================
Write-Host "Building posts from notes..."
Write-Host "  Notes folder: $NotesDir"

if (-not (Test-Path -LiteralPath $NotesDir)) {
    Write-Host "  Notes folder not found: $NotesDir"
    Write-Host "  (Create it, or edit the path at the top of build-posts.ps1.) Skipping."
    exit 0
}

# index every file in the notes folder so photos can be found by name
Get-ChildItem -LiteralPath $NotesDir -Recurse -File | ForEach-Object {
    $k = $_.Name.ToLower()
    if (-not $script:noteIndex.ContainsKey($k)) { $script:noteIndex[$k] = $_.FullName }
}
# ...then the rest of the vault (hidden folders like .obsidian/.trash are ignored)
if ((Test-Path -LiteralPath $MediaDir) -and ($MediaDir -ne $NotesDir)) {
    Get-ChildItem -LiteralPath $MediaDir -Recurse -File | ForEach-Object {
        $relPath = $_.FullName.Substring($MediaDir.Length)
        if ($relPath -notmatch '[\\/]\.') {
            $k = $_.Name.ToLower()
            if (-not $script:noteIndex.ContainsKey($k)) { $script:noteIndex[$k] = $_.FullName }
        }
    }
}
# ...and everything already in /photos
if (Test-Path -LiteralPath $photosDir) {
    Get-ChildItem -LiteralPath $photosDir -File | ForEach-Object {
        $script:photoIndex[$_.Name.ToLower()] = $_.Name
    }
}

$noteFiles = @(Get-ChildItem -LiteralPath $NotesDir -Recurse -File -Filter '*.md' | Sort-Object Name)
$built = 0
$drafts = 0
$usedIds = @{}
$chunks = @()

foreach ($f in $noteFiles) {
    # ignore Obsidian's hidden .trash/.obsidian folders and anything starting with _ (like _templates)
    $rel = $f.FullName.Substring($NotesDir.Length)
    if ($rel -match '[\\/][_.]' -or $f.Name -like '*.sync-conflict-*') { continue }
    try {
        $note = Parse-Note ([System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8))
        $meta = $note.Meta

        # A note is only published if it explicitly says  draft: false
        $isPublished = $false
        if ($meta.ContainsKey('draft')) {
            $isPublished = (@('false', 'no', 'n', '0') -contains $meta['draft'].ToLower())
        }
        if (-not $isPublished) {
            $drafts++
            if ($meta.ContainsKey('draft')) { Write-Host "  (draft, skipped) $($f.Name)" }
            else { Write-Host "  (no 'draft: false' line, skipped) $($f.Name)" }
            continue
        }

        $title = ''
        if ($meta.ContainsKey('title')) { $title = $meta['title'].Trim() }
        if ($title -eq '') { $title = [System.IO.Path]::GetFileNameWithoutExtension($f.Name) }

        $date = $null
        if ($meta.ContainsKey('date')) {
            $dm = [regex]::Match($meta['date'], '^(\d{4}-\d{2}-\d{2})')
            if ($dm.Success) {
                $parsed = [datetime]::MinValue
                if ([datetime]::TryParseExact($dm.Groups[1].Value, 'yyyy-MM-dd', [System.Globalization.CultureInfo]::InvariantCulture, [System.Globalization.DateTimeStyles]::None, [ref]$parsed)) {
                    $date = $dm.Groups[1].Value
                }
            }
        }
        if (-not $date) {
            $date = $f.LastWriteTime.ToString('yyyy-MM-dd')
            Warn "'$($f.Name)' has no valid date: line, so it was dated $date. Add  date: YYYY-MM-DD  at the top of the note."
        }

        Write-Host "  $($f.Name)"
        $bodyText = [regex]::Replace($note.Body, '(?s)%%.*?%%', '')   # %%private comments%% are removed
        $html = Convert-Body $bodyText

        $slug = ($f.BaseName.ToLower() -replace '[^a-z0-9]+', '-').Trim('-')
        if ($slug -eq '') { $slug = 'post' }
        $id = $slug
        $n = 2
        while ($usedIds.ContainsKey($id)) { $id = "$slug-$n"; $n++ }
        $usedIds[$id] = $true

        $chunks += ("posts.push({`n  id: `"" + (Escape-JsString $id) + "`",`n  date: `"" + $date + "`",`n  title: `"" + (Escape-JsString $title) + "`",`n  tags: [],`n  html: ``" + "`n" + (Escape-JsTemplate $html) + "`n" + "``" + "`n});`n")
        $built++
    } catch {
        Warn "Skipped '$($f.Name)': $($_.Exception.Message)"
    }
}

$header = "// AUTO-GENERATED by build-posts.ps1 from your Obsidian notes.`n// Do not edit by hand -- it is rewritten every time you run publish.bat.`n// Write or change posts in your notes folder instead.`n`n"
[System.IO.File]::WriteAllText($outFile, ($header + ($chunks -join "`n")), $utf8NoBom)

Write-Host "  Done: $built post(s) built, $drafts note(s) skipped, $($script:warnCount) warning(s)."
