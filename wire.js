// Renders the `wire` array (from wire-data.js) into #wire.
// No build step, no dependencies — this just runs in the browser.

const WIRE_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatWireTimestamp(ts) {
  // ts looks like "2026-09-20T18:45"
  const [datePart, timePart] = ts.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);

  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  const ampm = hh < 12 ? "AM" : "PM";
  const minuteStr = String(mm).padStart(2, "0");

  return `${WIRE_MONTHS[m - 1]} ${d} · ${hour12}:${minuteStr} ${ampm}`;
}

function renderWireEntry(entry) {
  const photoHtml = entry.photo
    ? `<img class="wire-photo" src="${entry.photo}" alt="">`
    : "";

  return `
    <article class="wire-entry">
      <div class="wire-time">${formatWireTimestamp(entry.timestamp)}</div>
      ${photoHtml}
      <p class="wire-text">${entry.text}</p>
    </article>
  `;
}

function renderWire() {
  const el = document.getElementById("wire");
  if (!el) return;

  const sorted = [...wire].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  if (sorted.length === 0) {
    el.innerHTML = `<p style="font-family: var(--sans); color: var(--muted);">Nothing posted yet.</p>`;
    return;
  }

  el.innerHTML = sorted.map(renderWireEntry).join("");
}

renderWire();
