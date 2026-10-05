// ---------------------------------------------------------------
// LOG
// ---------------------------------------------------------------
// Books, movies, albums, websites — anything you want to log and
// tag. Add a new one by copying an object below and pasting it at
// the TOP of the array (log.js sorts by date automatically, but
// newest-on-top keeps this file easy to scan).
//
// Fields:
//   id          - unique short string, e.g. "2026-09-20-dune"
//   date        - "YYYY-MM-DD"
//   tag         - a single word/short phrase: "book", "movie",
//                 "album", "website", etc. Lowercase. Any tag you
//                 use automatically shows up in the sidebar — you
//                 don't need to register new tags anywhere.
//   title       - the book/movie/album/site's actual title
//   photo       - cover image, screenshot, or poster. Filename from
//                 the /photos-log folder, e.g. "photos-log/file.jpg"
//   description - your quick thought on it
//   url         - optional. A link to the thing itself (mainly
//                 useful for websites). Leave as "" if none.
// ---------------------------------------------------------------

const logEntries = [
  {
    id: "entry1",
    date: "2026-09-25",
    tag: "book",
    title: "Lord Jim by Joseph Conrad",
    photo: "photos-log/lordjim.jpg",
    description: "A book I felt I had to read after coming to Indonesia. It's set in Kalimantan, where many of my friends are stationed. I knew Conrad from Heart of Darkness, and this one is a great continuation. Lots of similar atmosphere, especially the tall-tale feeling, but with a different moral dilemma at the core. I will update this when I'm done putting together my thoughts on it. I don't think there are many parallels between my time in Indonesia and Lord Jim's, but it's still worth analyzing.",
    url: ""
  }
];
