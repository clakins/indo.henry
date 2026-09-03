// ---------------------------------------------------------------
// POSTS
// ---------------------------------------------------------------
// Add a new post by copying an object below and putting it at the
// TOP of the array (newest first isn't required — main.js sorts by
// date automatically, but keeping newest-on-top makes this file
// easier to scan).
//
// Fields:
//   id     - unique short string, used for internal tracking (any
//            unique text works, e.g. "2026-09-02-first-week")
//   date   - "YYYY-MM-DD", used for sorting and the date badge
//   title  - post title
//   tags   - array of short strings, optional, can be []
//   html   - the post body. Plain HTML. Write photos in situ using:
//
//              <img class="post-photo" src="photos/your-file.jpg" alt="describe the photo">
//              <p class="post-photo-caption">Optional caption here.</p>
//
//            Put the actual image file in the /photos folder and
//            reference it by filename. Paragraphs are plain <p> tags.
// ---------------------------------------------------------------

const posts = [
  {
    id: "welcome",
    date: "2026-09-02",
    title: "Starting the log",
    tags: ["meta"],
    html: `
      <p>
        This is the first post. I'm setting this site up as a simple
        running feed — short updates, a photo when there's one worth
        sharing, and not much else.
      </p>
      <img class="post-photo" src="photos/example.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">Swap this out for a real photo — this is just here to show how images sit inside a post.</p>
      <p>
        More soon.
      </p>
    `
  }
];
