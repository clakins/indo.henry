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
    id: "changeyourlife",
    date: "2026-10-11",
    tag: "Video",
    title: "How to Change Your Life",
    photo: "photos-log/superfly.jpg",
    description: "A great video I saw on Youtube with some fun ideas. Here are my thoughts I jotted down: 1. Your thoughts are not you! You can view your thoughts as just another thing that your consiousness processes. Viewing negative thoughts as something you interpret, not something that you produce and are responsible for can really change your perspective. 2. Events have no context. You choose to define them as good or bad. Realizing this choice gives you power over those events.",
    url: "https://youtu.be/SM93p4dsGyM?si=9v6nSiHRXYQ8FJ6J"
  },
  {
    id: "superfly",
    date: "2026-10-10",
    tag: "Albums",
    title: "Superfly by Curtis Mayfield",
    photo: "photos-log/superfly.jpg",
    description: "Listened to his other album first, but I really liked this one too. Sat outside and listened to it while doing work. Felt like an American.",
    url: ""
  },
  {
    id: "apocalypsenow",
    date: "2026-10-6",
    tag: "Movies",
    title: "Apocalypse Now",
    photo: "photos-log/apocalypse.jpg",
    description: "Not even finished this one yet and its already a 5. And I haven't even gotten to the part with Kurtz yet. The perfect complement to Heart of Darkness.",
    url: ""
  },
  {
    id: "lordjim",
    date: "2026-10-5",
    tag: "Books",
    title: "Lord Jim by Joseph Conrad",
    photo: "photos-log/lordjim.jpg",
    description: "A book I felt I had to read after coming to Indonesia. It's set in Kalimantan, where many of my friends are stationed. I knew Conrad from Heart of Darkness, and this one is a great continuation. Lots of similar atmosphere, especially the tall-tale feeling, but with a different moral dilemma at the core. I will update this when I'm done putting together my thoughts on it. I don't think there are many parallels between my time in Indonesia and Lord Jim's, but it's still worth analyzing.",
    url: ""
  },
  {
    id: "bigchair",
    date: "2026-10-02",
    tag: "Albums",
    title: "Songs from the Big Chair by Tears for Fears",
    photo: "photos-log/bigchair.jpg",
    description: "I was unaware of how good they are beyong their big songs. This is on par with New Order for me. 4.5/5",
    url: ""
  }
];
