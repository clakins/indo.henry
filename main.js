// Renders the `posts` array (from posts.js) into #feed.
// No build step, no dependencies — this just runs in the browser.

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDateBadge(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return {
    day: String(d),
    monthYear: `${MONTHS[m - 1]} ${y}`
  };
}

function renderPost(post) {
  const { day, monthYear } = formatDateBadge(post.date);
  const tagsHtml = (post.tags && post.tags.length)
    ? `<div class="post-tags">${post.tags.map(t => `#${t}`).join("  ")}</div>`
    : "";

  return `
    <article class="post">
      <div class="post-date">
        <span class="day">${day}</span>
        ${monthYear}
      </div>
      <div class="post-body">
        <h2>${post.title}</h2>
        ${post.html}
        ${tagsHtml}
      </div>
    </article>
  `;
}

function renderFeed() {
  const feedEl = document.getElementById("feed");
  if (!feedEl) return;

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    feedEl.innerHTML = `<p style="font-family: var(--sans); color: var(--muted);">No posts yet.</p>`;
    return;
  }

  feedEl.innerHTML = sorted.map(renderPost).join("");
}

renderFeed();
