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
    title: "My First Post",
    tags:["update", "salatiga"],
    html: `
      <p>
        Hey! I made a blog, I'll start here by porting over my latest post from Instagram. Stay tuned for more. .
      </p>
      <img class="post-photo" src="photos/IMG_4349.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">Photo of Mt. Merbabu out the van window, something pleasing about it.</p>
      <p>
        Updates: Found a big ass mountain I really want to climb. Some things never change. I’m currently in Salatiga for language training and it’s a ridiculously beautiful mountain town in Central Java. Told my Colorado friend it reminds me of Indonesian Boulder. Classes are long and I spend the nights with my friends, so I don’t have a ton of time to myself, but I’m glad to be with my friends here. 10 more days and I’ll head back to my teaching site. My sister asked if I’m doing ok, so I told her this. Honestly, it’s hard. Adjusting to a new country away from everything I know is like work. And I’m in a phase where I have to put my head down and do hard, tedious work. But it’s work that gets me closer to a goal, so it’s work that I know I have to do. So yes I’m ok, thanks! More soon.
      </p>
    `
  }
];
