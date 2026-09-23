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
  // {
  //   id: "__",
  //   timestamp: "2026-__-__T__:__",
  //   text: "____",
  //   photo: "photos/____.jpg"
  // },
  {
    id: "second-wire",
    timestamp: "2026-09-23T10:17",
    text: "Having an anti-climactic 'come to God' moment. No hangover, no questionable life choices. But I'm curious and wondering if my life would be richer if I was more spiritual. I've always believed in fate and a reason that things happen. But, I haven't made it a formal practice and I think I would like to. Time to go shopping for a religion. So far, I've downloaded the Qur'an, the Bhagavad Gita, What the Buddha Taught, and The World's Religions by Huston Smith. Updates to come."
  }
  {
    id: "welcome-wire",
    timestamp: "2026-09-20T18:45",
    text: "Starting this mini feed for quick thoughts and photos, longform will stay in the Feed. Also working on a way to subscribe to emails, stay tuned.",
    photo: "photos/englishcorner.JPG"
  }
];
