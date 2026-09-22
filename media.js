// Renders the `media` array (from media-data.js) into #media-rail.

const MEDIA_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatMediaTimestamp(ts) {
  // ts looks like "2026-09-21T09:15:00"
  const [datePart, timePart] = ts.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  const ampm = hh < 12 ? "AM" : "PM";
  return `${MEDIA_MONTHS[m - 1]} ${d} · ${hour12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

function renderMediaItem(item) {
  let mediaHtml = "";
  if (item.type === "image") {
    mediaHtml = `<img class="media-visual" src="${item.file}" alt="">`;
  } else if (item.type === "audio") {
    mediaHtml = `<audio class="media-audio" controls src="${item.file}"></audio>`;
  } else if (item.type === "video") {
    mediaHtml = `<video class="media-visual" controls src="${item.file}"></video>`;
  }

  return `
    <div class="media-item">
      ${mediaHtml}
      <div class="media-time">${formatMediaTimestamp(item.timestamp)}</div>
    </div>
  `;
}

function renderMedia() {
  const el = document.getElementById("media-rail");
  if (!el) return;

  const sorted = [...media].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  if (sorted.length === 0) {
    el.innerHTML = `<p style="font-family: var(--sans); color: var(--muted); font-size: 0.85rem;">No media yet.</p>`;
    return;
  }

  el.innerHTML = sorted.map(renderMediaItem).join("");
}

renderMedia();
