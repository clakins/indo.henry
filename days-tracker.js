// Computes days completed / total grant days from fixed dates, live in the
// visitor's browser — no manual updating needed, ever.
//
// Shows "(Day: 54/273)" next to the site title in the header of every page
// that loads this script, and keeps filling the footer line (#days-tracker)
// where a page has one.

(function () {
  const ARRIVAL = new Date(2026, 7, 18);   // August 18, 2026
  const DEPARTURE = new Date(2027, 4, 18); // May 18, 2027

  function daysBetween(a, b) {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((b - a) / msPerDay);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  ARRIVAL.setHours(0, 0, 0, 0);
  DEPARTURE.setHours(0, 0, 0, 0);

  const totalDays = daysBetween(ARRIVAL, DEPARTURE);
  const daysIn = daysBetween(ARRIVAL, today);
  const daysLeft = daysBetween(today, DEPARTURE);

  // Header: (Day: completed/total), held at 0 before arrival and at the total after.
  const completed = Math.max(0, Math.min(daysIn, totalDays));
  document.querySelectorAll(".site-title").forEach(title => {
    if (title.parentNode.querySelector(".site-day-count")) return;
    const span = document.createElement("span");
    span.className = "site-day-count";
    span.textContent = `(Day: ${completed}/${totalDays})`;
    title.after(span);
  });

  // Footer line
  const el = document.getElementById("days-tracker");
  if (el) {
    if (daysIn < 0) {
      el.textContent = `${Math.abs(daysIn)} days until arrival in Indonesia.`;
    } else if (daysLeft < 0) {
      el.textContent = `Fulbright grant complete.`;
    } else {
      el.textContent = `Day ${daysIn} of ${totalDays} in Indonesia — ${daysLeft} days to go.`;
    }
  }
})();
