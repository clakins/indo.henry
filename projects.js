// Renders the `projects` array (from projects-data.js) into the
// sidebar nav (#projects-nav) and main scroll area (#projects-main),
// and powers a click-to-enlarge lightbox with next/prev navigation
// scoped to each project's own set of items.
//
// Items are images by default. Add type: "video" to an item to make
// it a video: it plays inline in the grid, and also works inside the
// lightbox carousel.

function renderProjectSection(project, projectIndex) {
  const subtitleHtml = project.subtitle
    ? `<p class="project-subtitle">${project.subtitle}</p>`
    : "";

  const descHtml = project.description
    ? `<p class="project-description">${project.description}</p>`
    : "";

  const imagesHtml = project.images
    .map((item, itemIndex) => {
      const mediaHtml = item.type === "video"
        ? `<video src="${item.file}" controls preload="metadata"></video>`
        : `<img src="${item.file}" alt="${item.caption || project.title}"
                data-project-index="${projectIndex}" data-image-index="${itemIndex}">`;
      return `
      <figure class="project-image">
        ${mediaHtml}
        ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}
      </figure>
    `;
    })
    .join("");

  return `
    <section id="${project.id}" class="project-section">
      <h2 class="project-title">${project.title}</h2>
      ${subtitleHtml}
      ${descHtml}
      <div class="project-grid">
        ${imagesHtml}
      </div>
    </section>
  `;
}

function renderProjects() {
  const navEl = document.getElementById("projects-nav");
  const mainEl = document.getElementById("projects-main");
  if (!navEl || !mainEl) return;

  if (projects.length === 0) {
    mainEl.innerHTML = `<p style="font-family: var(--sans); color: var(--muted);">No projects yet.</p>`;
    return;
  }

  navEl.innerHTML = projects
    .map(p => `<a href="#${p.id}" class="projects-nav-link">${p.title}</a>`)
    .join("");

  mainEl.innerHTML = projects.map(renderProjectSection).join("");

  setupLightbox();
}

// ---------------- Lightbox ----------------

let lightboxProjectIndex = 0;
let lightboxImageIndex = 0;

function setupLightbox() {
  if (!document.getElementById("lightbox-overlay")) {
    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-prev" aria-label="Previous">&#8249;</button>
      <img class="lightbox-image" src="" alt="">
      <video class="lightbox-image lightbox-video" controls style="display:none"></video>
      <button class="lightbox-next" aria-label="Next">&#8250;</button>
      <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    overlay.querySelector(".lightbox-prev").addEventListener("click", (e) => { e.stopPropagation(); showLightboxImage(-1); });
    overlay.querySelector(".lightbox-next").addEventListener("click", (e) => { e.stopPropagation(); showLightboxImage(1); });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLightboxImage(-1);
      if (e.key === "ArrowRight") showLightboxImage(1);
    });
  }

  // Click handlers go on images only; grid videos play inline instead
  document.querySelectorAll(".project-image img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxProjectIndex = Number(img.dataset.projectIndex);
      lightboxImageIndex = Number(img.dataset.imageIndex);
      openLightbox();
    });
  });
}

function openLightbox() {
  updateLightboxContent();
  document.getElementById("lightbox-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox-overlay");
  overlay.querySelector(".lightbox-video").pause();
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function showLightboxImage(direction) {
  const items = projects[lightboxProjectIndex].images;
  lightboxImageIndex = (lightboxImageIndex + direction + items.length) % items.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const project = projects[lightboxProjectIndex];
  const item = project.images[lightboxImageIndex];
  const overlay = document.getElementById("lightbox-overlay");
  const imgEl = overlay.querySelector("img.lightbox-image");
  const videoEl = overlay.querySelector(".lightbox-video");

  videoEl.pause();

  if (item.type === "video") {
    imgEl.style.display = "none";
    videoEl.style.display = "";
    videoEl.src = item.file;
  } else {
    videoEl.style.display = "none";
    imgEl.style.display = "";
    imgEl.src = item.file;
    imgEl.alt = item.caption || project.title;
  }

  overlay.querySelector(".lightbox-caption").textContent = item.caption || "";

  const hasMultiple = project.images.length > 1;
  overlay.querySelector(".lightbox-prev").style.display = hasMultiple ? "" : "none";
  overlay.querySelector(".lightbox-next").style.display = hasMultiple ? "" : "none";
}

renderProjects();
