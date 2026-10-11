// Map view for the Projects page.
//
// Uses `projects` (projects-data.js) and `MAP_DATA` (map-data.js, generated
// outlines). Draws the outlines as SVG, lays HTML pin buttons on top (so pins
// stay the same size at any screen width), and handles the List / Map switch.
// Projects whose pins would overlap are grouped into one pin that opens a
// small list.

(function () {
  if (typeof projects === "undefined" || typeof MAP_DATA === "undefined") return;

  const RAD = Math.PI / 180;
  const CLUSTER_PX = 20; // pins closer than this (on screen) share one pin

  // ---------- Projections (match the ones used to generate map-data.js) ----------

  function projectUS(lng, lat) {
    const p = MAP_DATA.us;
    const phi0 = 29.5 * RAD, phi1 = 45.5 * RAD;
    const sy0 = Math.sin(phi0);
    const n = (sy0 + Math.sin(phi1)) / 2;
    const c = 1 + sy0 * (2 * n - sy0);
    const r0 = Math.sqrt(c) / n;
    const raw = (l, f) => {
      const r = Math.sqrt(c - 2 * n * Math.sin(f)) / n;
      return [r * Math.sin(l * n), r0 - r * Math.cos(l * n)];
    };
    const [cx, cy] = raw(-0.6 * RAD, 38.7 * RAD);
    const [x, y] = raw((lng + 96) * RAD, lat * RAD);
    return [p.tx + p.scale * (x - cx), p.ty - p.scale * (y - cy)];
  }

  function projectWorld(lng, lat) {
    const p = MAP_DATA.world;
    const l = lng * RAD, f = lat * RAD, f2 = f * f, f4 = f2 * f2;
    const x = l * (0.8707 - 0.131979 * f2 + f4 * (-0.013791 + f4 * (0.003971 * f2 - 0.001529 * f4)));
    const y = f * (1.007226 + f2 * (0.015085 + f4 * (-0.044475 + 0.028874 * f2 - 0.005916 * f4)));
    return [p.tx + p.scale * x, p.ty - p.scale * y];
  }

  // The US view only covers the lower 48 states, so a location has to fall
  // inside that box to get a pin there (everything else shows on World).
  function inUS(loc) {
    return loc.lat >= 24 && loc.lat <= 50 && loc.lng >= -125.5 && loc.lng <= -66;
  }

  const VIEWS = {
    us:    { data: MAP_DATA.us,    project: projectUS,    accepts: inUS },
    world: { data: MAP_DATA.world, project: projectWorld, accepts: () => true },
  };

  // ---------- Elements ----------

  const mapEl = document.getElementById("projects-map");
  const mainEl = document.getElementById("projects-main");
  const navEl = document.getElementById("projects-nav");
  const toolbar = document.querySelector(".projects-toolbar");
  if (!mapEl || !mainEl || !toolbar) return;

  const SVG_NS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let view = "list";
  let scope = "us";
  let openPin = null; // the pin button whose popup is showing
  let lastWidth = 0;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // Build the static frame once.
  const frame = el("div", "map-frame");
  const scopeBar = el("div", "map-scope");
  scopeBar.setAttribute("role", "group");
  scopeBar.setAttribute("aria-label", "Map area");
  const scopeButtons = {};
  [["us", "United States"], ["world", "World"]].forEach(([key, label]) => {
    const b = el("button", "map-scope-btn", label);
    b.type = "button";
    b.addEventListener("click", () => setScope(key));
    scopeButtons[key] = b;
    scopeBar.appendChild(b);
  });

  const stage = el("div", "map-stage");
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "map-svg");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Outline map showing where projects were made");
  const bordersPath = document.createElementNS(SVG_NS, "path");
  bordersPath.setAttribute("class", "map-borders");
  const outlinePath = document.createElementNS(SVG_NS, "path");
  outlinePath.setAttribute("class", "map-outline");
  svg.append(bordersPath, outlinePath);
  const pinLayer = el("div", "map-pins");
  stage.append(svg, pinLayer);

  const note = el("p", "map-note");
  const popup = el("div", "map-popup");
  popup.hidden = true;
  popup.setAttribute("role", "dialog");

  frame.append(scopeBar, stage, note, popup);
  mapEl.appendChild(frame);

  // ---------- Drawing ----------

  function drawBase() {
    const d = VIEWS[scope].data;
    svg.setAttribute("viewBox", `0 0 ${d.width} ${d.height}`);
    stage.style.aspectRatio = `${d.width} / ${d.height}`;
    bordersPath.setAttribute("d", d.borders);
    outlinePath.setAttribute("d", d.outline);
    Object.keys(scopeButtons).forEach(k => {
      scopeButtons[k].setAttribute("aria-pressed", String(k === scope));
    });
  }

  function pinIcon() {
    const s = document.createElementNS(SVG_NS, "svg");
    s.setAttribute("class", "pin-icon");
    s.setAttribute("viewBox", "0 0 24 30");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML =
      '<path class="pin-needle" d="M12 29.5 V19"/>' +
      '<path class="pin-collar" d="M7.5 19.5 H16.5 L15.2 13.5 H8.8 Z"/>' +
      '<circle class="pin-head" cx="12" cy="9" r="8"/>' +
      '<circle class="pin-shine" cx="9" cy="6.2" r="2.3"/>';
    return s;
  }

  // Group the projects that have a spot in the current view into pins.
  function buildClusters() {
    const v = VIEWS[scope];
    const scale = stage.clientWidth / v.data.width;
    const clusters = [];
    projects.forEach((project, index) => {
      const loc = project.location;
      if (!loc || !v.accepts(loc)) return;
      const [x, y] = v.project(loc.lng, loc.lat);
      const hit = clusters.find(c =>
        Math.hypot(c.x - x, c.y - y) * scale < CLUSTER_PX);
      if (hit) {
        hit.members.push(index);
        const n = hit.members.length;
        hit.x += (x - hit.x) / n;
        hit.y += (y - hit.y) / n;
      } else {
        clusters.push({ x, y, members: [index] });
      }
    });
    return clusters;
  }

  function renderPins() {
    closePopup(false);
    pinLayer.textContent = "";
    if (!stage.clientWidth) return;
    lastWidth = stage.clientWidth;
    const d = VIEWS[scope].data;

    buildClusters().forEach(cluster => {
      const first = projects[cluster.members[0]];
      const pin = el("button", "map-pin");
      pin.type = "button";
      pin.style.left = (cluster.x / d.width * 100) + "%";
      pin.style.top = (cluster.y / d.height * 100) + "%";
      pin.dataset.members = cluster.members.join(",");
      pin.setAttribute("aria-haspopup", "dialog");
      pin.setAttribute("aria-label", cluster.members.length === 1
        ? first.title + (first.location.name ? ", " + first.location.name : "")
        : cluster.members.length + " projects near " + (first.location.name || "this spot"));
      pin.appendChild(pinIcon());
      if (cluster.members.length > 1) {
        pin.appendChild(el("span", "pin-count", String(cluster.members.length)));
      }
      pin.addEventListener("click", (e) => {
        e.stopPropagation();
        if (openPin === pin) closePopup(true); else showPopup(pin, cluster.members);
      });
      pinLayer.appendChild(pin);
    });

    updateNote();
  }

  function updateNote() {
    note.textContent = "";
    note.hidden = true;
    const located = projects.filter(p => p.location);
    if (located.length === 0) {
      note.textContent = "No project locations yet.";
      note.hidden = false;
      return;
    }
    if (scope === "us") {
      const outside = located.filter(p => !inUS(p.location)).length;
      if (outside > 0) {
        note.append(
          outside + (outside === 1 ? " project is" : " projects are") + " outside this map. ");
        const link = el("button", "map-note-link", "See the world map");
        link.type = "button";
        link.addEventListener("click", () => setScope("world"));
        note.appendChild(link);
        note.hidden = false;
      }
    }
  }

  // ---------- Popup ----------

  function card(project, compact) {
    const a = el("a", "map-card" + (compact ? " map-card-compact" : ""));
    a.href = "#" + project.id;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      goToProject(project.id);
    });
    const first = project.images && project.images[0];
    if (first) {
      const img = el("img", "map-card-photo");
      img.src = first.file;
      img.alt = "";
      img.addEventListener("error", () => img.remove());
      a.appendChild(img);
    }
    const text = el("span", "map-card-text");
    text.appendChild(el("span", "map-card-title", project.title));
    if (project.location && project.location.name) {
      text.appendChild(el("span", "map-card-place", project.location.name));
    }
    a.appendChild(text);
    return a;
  }

  function showPopup(pin, members) {
    if (openPin) openPin.classList.remove("is-open");
    openPin = pin;
    pin.classList.add("is-open");

    popup.textContent = "";
    const close = el("button", "map-popup-close", "\u00d7");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.addEventListener("click", () => closePopup(true));
    popup.appendChild(close);

    if (members.length === 1) {
      const p = projects[members[0]];
      popup.setAttribute("aria-label", p.title);
      popup.classList.remove("is-list");
      popup.appendChild(card(p, false));
    } else {
      popup.setAttribute("aria-label", members.length + " projects at this location");
      popup.classList.add("is-list");
      popup.appendChild(el("p", "map-popup-head", "Pick a project"));
      members.forEach(i => popup.appendChild(card(projects[i], true)));
    }

    popup.hidden = false;
    positionPopup(pin);
    const firstLink = popup.querySelector(".map-card");
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  function positionPopup(pin) {
    const f = frame.getBoundingClientRect();
    const r = pin.getBoundingClientRect();
    const w = popup.offsetWidth, h = popup.offsetHeight;
    const gap = 8;
    let left = r.left + r.width / 2 - f.left - w / 2;
    left = Math.max(gap, Math.min(left, f.width - w - gap));
    let top = r.top - f.top - h - gap;
    if (top < gap) {
      top = r.bottom - f.top + gap; // no room above: try below
      if (top + h > f.height - gap) {
        // no room below either: open beside the pin
        left = r.right - f.left + gap;
        if (left + w > f.width - gap) left = r.left - f.left - w - gap;
        left = Math.max(gap, left);
        top = Math.max(gap, Math.min(r.top - f.top, f.height - h - gap));
      }
    }
    popup.style.left = left + "px";
    popup.style.top = top + "px";
  }

  function closePopup(returnFocus) {
    if (!openPin) { popup.hidden = true; return; }
    const pin = openPin;
    openPin = null;
    pin.classList.remove("is-open");
    popup.hidden = true;
    if (returnFocus && pin.isConnected) pin.focus({ preventScroll: true });
  }

  document.addEventListener("click", (e) => {
    if (openPin && !popup.contains(e.target)) closePopup(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openPin) closePopup(true);
  });

  // ---------- Switching views ----------

  function setScope(next) {
    scope = next;
    drawBase();
    renderPins();
  }

  function setView(next, updateUrl) {
    view = next;
    const isMap = next === "map";
    mapEl.hidden = !isMap;
    mainEl.hidden = isMap;
    toolbar.querySelectorAll(".view-btn").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.view === next));
    });
    if (isMap) {
      drawBase();
      renderPins();
    } else {
      closePopup(false);
    }
    if (updateUrl !== false) {
      const url = isMap ? location.pathname + "?view=map" : location.pathname;
      history.replaceState(null, "", url);
    }
  }

  function goToProject(id) {
    setView("list", false);
    history.replaceState(null, "", location.pathname + "#" + id);
    const target = document.getElementById(id);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
        block: "start",
      }));
    }
  }

  toolbar.querySelectorAll(".view-btn").forEach(b => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });

  // In map view the sidebar list opens that project's pin instead of scrolling.
  if (navEl) {
    navEl.addEventListener("click", (e) => {
      const link = e.target.closest("a.projects-nav-link");
      if (!link || view !== "map") return;
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const index = projects.findIndex(p => p.id === id);
      const project = projects[index];

      if (!project || !project.location) { goToProject(id); return; }

      // Stay on the current map if it shows this project, otherwise go to World.
      const wanted = VIEWS[scope].accepts(project.location) ? scope : "world";
      if (wanted !== scope) setScope(wanted);
      const pin = Array.from(pinLayer.children).find(p =>
        p.dataset.members.split(",").map(Number).includes(index));
      if (pin) {
        e.stopPropagation();
        showPopup(pin, pin.dataset.members.split(",").map(Number));
      }
    });
  }

  // Re-group pins when the map's size changes (window resize, rotating a phone).
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => {
      if (view === "map" && stage.clientWidth && stage.clientWidth !== lastWidth) renderPins();
    }).observe(stage);
  }

  // Open straight to the map with projects.html?view=map
  if (new URLSearchParams(location.search).get("view") === "map") setView("map", false);
})();
