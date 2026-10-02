// Renders the `projects` array (from projects-data.js) into the
// sidebar nav (#projects-nav) and main scroll area (#projects-main).

function renderProjectSection(project) {
  const descHtml = project.description
    ? `<p class="project-description">${project.description}</p>`
    : "";

  const imagesHtml = project.images
    .map(img => `
      <figure class="project-image">
        <img src="${img.file}" alt="${img.caption || project.title}">
        ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ""}
      </figure>
    `)
    .join("");

  return `
    <section id="${project.id}" class="project-section">
      <h2 class="project-title">${project.title}</h2>
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
}

renderProjects();
