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
    title: "Time to Get Away (from Salatiga)",
    tags:["update", "salatiga"],
    html: `
      <img class="post-photo" src="photos/IMG_4673.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">A view of terraced rice fields from our Jeep tour.</p>
      <p>
        I'm ready to teach. This week, our co-teachers have arrived from site to join us in Salatiga for intensive teaching and collaboration training. I enjoy my co-teacher's company, and I respect his passion for his job. All this to say that I'm itching to get into a classroom and learn this in the real world. Salatiga has been great, but it's insular. I'm grateful for the time with my friends, but it's time to get to work. 
      </p>
      <img class="post-photo" src="photos/IMG_4820.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">On my walk to school this morning. Playing with my iPhone camera settings to kill off the overprocessing.</p>
      <p>
        In the meantime though, we've done our best to explore the surroundings of Salatiga. On Saturday, our friend took us to a swimming hole with water that was questionably colored but refreshingly cold. Then we took a sunset Jeep tour, of which 30 minutes was an obligatory 8-cigarette smoke break for our driver, but that ended up giving us our best sunset yet. Saw monkeys and the forest felt like something out of Jurassic Park, probably helped by our tour Jeep that was older than that movie. 
      </p>
      <img class="post-photo" src="photos/IMG_4795.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">Sulfur pits of Dieng Plateau. Yellowstone adjacent with similarly loud tourists.</p>
      <p>
        On Sunday, we took a tour through the Dieng Plateau, a truly strange volcanic artifact that felt like an equal mix of the planet Venus, Nepalese mountain towns, and a oil and gas refinery. The mountains are high enough that you often can't tell if the sudden fog that engulfs you is sulfur smoke or a cumulus cloud floating through the area. A little over-crowded but I was most impressed by the mountain towns which looked like something out of South America or the Himalayas. Tried Mie Ongklok for lunch and again for dinner in Wonosobo where we heard an English language punk rock band jamming in the distance. 
      </p>
      <img class="post-photo" src="photos/IMG_4583(1).jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">Our swimming hole suspiciously close to sewage conduits.</p>
      <p>
        I've really enjoyed my time here and I will be coming back, but I miss my students that I haven't even met yet. I feel responsible for my work and I'm proud of that. We'll see if the grass is browner once I need to lock in.
      </p>
    `
  },
  {
    id: "welcome",
    date: "2026-09-02",
    title: "My First Post",
    tags:["update", "salatiga"],
    html: `
      <p>
        Hey! I made a blog, I'll start here by porting over my latest post from Instagram. Stay tuned for more.
      </p>
      <img class="post-photo" src="photos/IMG_4349.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">Photo of Mt. Merbabu out the van window, something pleasing about this picture I think.</p>
      <p>
        Updates: Found a big ass mountain I really want to climb. Some things never change. I'm currently in Salatiga for language training and it's a ridiculously beautiful mountain town in Central Java. Told my Colorado friend it reminds me of Indonesian Boulder. Classes are long and I spend the nights with my friends, so I don't have a ton of time to myself, but I'm glad to be with my friends here. 10 more days and I'll head back to my teaching site. My sister asked if I'm doing ok, so I told her this. Honestly, it's hard. Adjusting to a new country away from everything I know is like work. And I'm in a phase where I have to put my head down and do hard, tedious work. But it's work that gets me closer to a goal, so it's work that I know I have to do. So yes I'm ok, thanks! More soon.
      </p>
    `
  }
];
