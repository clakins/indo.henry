// ---------------------------------------------------------------
// WIRE
// ---------------------------------------------------------------
// Quick posts: a photo and/or a short thought, timestamped. Add a
// new one by copying an object below and pasting it at the TOP of
// the array (wire.js sorts by timestamp automatically, but
// newest-on-top keeps this file easy to scan).
//
// Fields:
//   id        - unique short string, e.g. "2026-09-20-mountain"
//   timestamp - "YYYY-MM-DDTHH:MM" in 24-hour time, e.g. the 15th
//               at 2:30pm is "2026-09-15T14:30"
//   text      - the short thought. Plain text, no HTML tags needed.
//   photo     - optional. Filename from the /photos folder, e.g.
//               "photos/your-file.jpg". Leave as "" (empty quotes)
//               for a text-only entry.
// ---------------------------------------------------------------

const wire = [
  {
    id: "welcome-wire",
    timestamp: "2026-09-20T18:45",
    text: "Starting a second feed for the small stuff — a photo, a passing thought, nothing that needs a full post.",
    photo: "photos/example.jpg"
  }
];
