# Kudus Log

A plain static site: no build step, no framework, no database. Just HTML,
CSS, and one JS file holding your posts.

## Files

```
index.html   feed page (loads posts.js + main.js)
about.html   about page
now.html     "now" page — what you're currently up to
style.css    all visual design
posts.js     ← you edit this to add posts
main.js      renders posts.js into the feed (you shouldn't need to touch this)
feed.xml     RSS feed, updated by hand alongside posts.js
photos/      put your images here
```

## Running it locally

No server needed for basic use — just open `index.html` in a browser.
Double-click it, or from a terminal:

```
open index.html          # macOS
start index.html         # Windows
```

If you want live-reload while editing (optional, nicer for active writing
sessions), and you have Python installed:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Adding a post

1. Drop any photos for the post into `/photos`.
2. Open `posts.js`.
3. Copy an existing post object, paste it at the top of the `posts` array,
   and edit the fields. Photos go inline inside `html`, wherever you want
   them to appear in the post:

   ```js
   <img class="post-photo" src="photos/your-file.jpg" alt="describe it">
   <p class="post-photo-caption">Optional caption.</p>
   ```

4. Save, refresh the page in your browser, check it looks right.
5. (Optional but good practice) add the new post as an `<item>` in
   `feed.xml` too, so RSS subscribers see it.

That's it — no build command, no compiling.

## Getting it into git

From inside the `site` folder:

```
git init
git add .
git commit -m "Initial site"
```

Create an empty repo on GitHub (no README/license, so it doesn't conflict),
then:

```
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

From then on, whenever you add a post:

```
git add .
git commit -m "New post: <title>"
git push
```

## Hosting (free)

**GitHub Pages** is the simplest option and works well with what you have:

1. Push the repo to GitHub (above).
2. On GitHub: Settings → Pages → under "Build and deployment," set
   Source to "Deploy from a branch," branch `main`, folder `/root`.
3. Save. GitHub gives you a URL like `https://YOUR-USERNAME.github.io/YOUR-REPO/`
   within a minute or two.
4. Optional: buy a domain (Namecheap, Cloudflare Registrar — roughly
   $10–15/year) and point it at GitHub Pages via a custom domain setting
   in the same Pages settings page. GitHub's docs walk through the DNS
   records needed.

Netlify or Vercel work the same way if you'd rather use those — connect
the GitHub repo, no config needed since there's no build step.

## What comes next (when you're ready)

- **More structure to posts**: tags page, an archive by month, search.
- **A build step**: once hand-editing `posts.js` feels tedious, move to a
  static site generator (Eleventy is a good fit) that lets you write
  posts in Markdown files instead of JS objects. The current file
  structure (`photos/`, per-post content) carries over conceptually.
- **Photo handling**: right now images are full-size — worth compressing
  before upload (or adding a build step that does it) once you're posting
  a lot of them, so the site stays fast in Indonesia's connectivity.
- **Webmentions / comments**: if you ever want light interaction without
  running your own comment system.
- **Your travel map**: could become its own page on this same site later.

None of that is needed to start posting — the current setup is enough to
use today.
