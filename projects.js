// Renders the `projects` array (from projects-data.js) into the
// sidebar nav (#projects-nav) and main scroll area (#projects-main),
// and powers a click-to-enlarge lightbox with next/prev navigation
// scoped to each project's own set of images.

function renderProjectSection(project, projectIndex) {
  const subtitleHtml = project.subtitle
    ? `<p class="project-subtitle">${project.subtitle}</p>`
    : "";

  const descHtml = project.description
    ? `<p class="project-description">${project.description}</p>`
    : "";

  const imagesHtml = project.images
    .map((img, imageIndex) => `
      <figure class="project-image">
        <img src="${img.file}" alt="${img.caption || project.title}"
             data-project-index="${projectIndex}" data-image-index="${imageIndex}">
        ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ""}
      </figure>
    `)
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
  // Build the overlay once
  if (!document.getElementById("lightbox-overlay")) {
    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-prev" aria-label="Previous">&#8249;</button>
      <img class="lightbox-image" src="" alt="">
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

  // Attach click handlers to every project image
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
  document.getElementById("lightbox-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function showLightboxImage(direction) {
  const images = projects[lightboxProjectIndex].images;
  lightboxImageIndex = (lightboxImageIndex + direction + images.length) % images.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const project = projects[lightboxProjectIndex];
  const img = project.images[lightboxImageIndex];
  const overlay = document.getElementById("lightbox-overlay");
  overlay.querySelector(".lightbox-image").src = img.file;
  overlay.querySelector(".lightbox-image").alt = img.caption || project.title;
  overlay.querySelector(".lightbox-caption").textContent = img.caption || "";

  const prevBtn = overlay.querySelector(".lightbox-prev");
  const nextBtn = overlay.querySelector(".lightbox-next");
  const hasMultiple = project.images.length > 1;
  prevBtn.style.display = hasMultiple ? "" : "none";
  nextBtn.style.display = hasMultiple ? "" : "none";
}

renderProjects();
