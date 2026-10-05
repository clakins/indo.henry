// Renders `logEntries` (from log-data.js) into #log-main, with a
// tag sidebar (#log-nav). "All" shows the chronological feed view;
// clicking a tag switches to a library grid of just that tag, where
// clicking an image opens a lightbox scoped to that tag's images.

const LOG_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let currentTag = "all"; // "all" or a specific tag string
let lightboxEntries = [];
let lightboxIndex = 0;

function formatLogDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${LOG_MONTHS[m - 1]} ${d}, ${y}`;
}

function getAllTags() {
  const tags = new Set(logEntries.map(e => e.tag.toLowerCase()));
  return [...tags].sort();
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function renderSidebar() {
  const navEl = document.getElementById("log-nav");
  const tags = getAllTags();

  const allLink = `<a href="#" data-tag="all" class="log-nav-link ${currentTag === "all" ? "active" : ""}">All</a>`;
  const tagLinks = tags.map(tag =>
    `<a href="#" data-tag="${tag}" class="log-nav-link ${currentTag === tag ? "active" : ""}">${capitalize(tag)}</a>`
  ).join("");

  navEl.innerHTML = allLink + tagLinks;

  navEl.querySelectorAll(".log-nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      currentTag = link.dataset.tag;
      renderSidebar();
      renderMain();
    });
  });
}

function renderFeedItem(entry) {
  return `
    <article class="log-feed-item">
      <img class="log-feed-photo" src="${entry.photo}" alt="${entry.title}" data-id="${entry.id}">
      <div class="log-feed-body">
        <div class="log-feed-date">${formatLogDate(entry.date)} · ${capitalize(entry.tag)}</div>
        <h2 class="log-feed-title">${entry.title}</h2>
        <p class="log-feed-description">${entry.description}</p>
        ${entry.url ? `<a href="${entry.url}" target="_blank" class="log-feed-link">Visit ${entry.title} &rarr;</a>` : ""}
      </div>
    </article>
  `;
}

function renderLibraryTile(entry, index) {
  return `
    <figure class="log-library-tile">
      <img src="${entry.photo}" alt="${entry.title}" data-index="${index}">
      <figcaption>${entry.title}</figcaption>
    </figure>
  `;
}

function renderMain() {
  const mainEl = document.getElementById("log-main");

  if (logEntries.length === 0) {
    mainEl.innerHTML = `<p style="font-family: var(--sans); color: var(--muted);">Nothing logged yet.</p>`;
    return;
  }

  if (currentTag === "all") {
    const sorted = [...logEntries].sort((a, b) => b.date.localeCompare(a.date));
    mainEl.innerHTML = `<div class="log-feed">${sorted.map(renderFeedItem).join("")}</div>`;
    attachLightboxHandlers(sorted, ".log-feed-photo");
  } else {
    const filtered = logEntries.filter(e => e.tag.toLowerCase() === currentTag);
    const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));
    mainEl.innerHTML = `<div class="log-library">${sorted.map(renderLibraryTile).join("")}</div>`;
    attachLightboxHandlers(sorted, ".log-library-tile img");
  }
}

// ---------------- Lightbox ----------------

function attachLightboxHandlers(entries, selector) {
  lightboxEntries = entries;
  setupLightboxOverlay();

  document.querySelectorAll(selector).forEach((img, i) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      lightboxIndex = i;
      openLogLightbox();
    });
  });
}

function setupLightboxOverlay() {
  if (document.getElementById("log-lightbox-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "log-lightbox-overlay";
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous">&#8249;</button>
    <img class="lightbox-image" src="" alt="">
    <button class="lightbox-next" aria-label="Next">&#8250;</button>
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".lightbox-close").addEventListener("click", closeLogLightbox);
  overlay.querySelector(".lightbox-prev").addEventListener("click", (e) => { e.stopPropagation(); showLogLightboxImage(-1); });
  overlay.querySelector(".lightbox-next").addEventListener("click", (e) => { e.stopPropagation(); showLogLightboxImage(1); });
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeLogLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") closeLogLightbox();
    if (e.key === "ArrowLeft") showLogLightboxImage(-1);
    if (e.key === "ArrowRight") showLogLightboxImage(1);
  });
}

function openLogLightbox() {
  updateLogLightboxContent();
  document.getElementById("log-lightbox-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLogLightbox() {
  document.getElementById("log-lightbox-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function showLogLightboxImage(direction) {
  lightboxIndex = (lightboxIndex + direction + lightboxEntries.length) % lightboxEntries.length;
  updateLogLightboxContent();
}

function updateLogLightboxContent() {
  const entry = lightboxEntries[lightboxIndex];
  const overlay = document.getElementById("log-lightbox-overlay");
  overlay.querySelector(".lightbox-image").src = entry.photo;
  overlay.querySelector(".lightbox-image").alt = entry.title;
  overlay.querySelector(".lightbox-caption").textContent = entry.title;

  const hasMultiple = lightboxEntries.length > 1;
  overlay.querySelector(".lightbox-prev").style.display = hasMultiple ? "" : "none";
  overlay.querySelector(".lightbox-next").style.display = hasMultiple ? "" : "none";
}

renderSidebar();
renderMain();
