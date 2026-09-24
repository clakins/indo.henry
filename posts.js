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
    id: "week2",
    date: "2026-09-24",
    title: "Harder Than You Think",
    tags: ["update", "kudus"],
    html: `
      <img class="post-photo" src="photos/IMG_5329.JPG" alt="Placeholder example photo">
      <p class="post-photo-caption">My TV works!</p>
      <p>
       I definitely spoke too soon in that last post. This is really, really tough. I honestly can't even begin to understand how teachers make careers out of this. Any job I have ever worked has not been half as stressful, consuming, and emotionally draining as 4.5 hours of back-to-back English classes. Realizing I had nine more months of this really demoralized me at the end of the first day. 
      </p>
      <p>
      But now that it's the end of the week, I'm not feeling quite so bad. There's a rhythm to it, and right now I can see it but I don't have it yet. As far as this year goes, right now is pretty much the hardest it will be. I have no experience, no emotional connection to the students yet, not trust or bond built with them, and zero experience with my co-teachers. I genuinely believe that every day will make some progress towards each of those and that will make it easier. 
      </p>
      <p>
      I'm starting to find my place in school. I get invited to lunch with other teachers. I talk to students who pass in the halls. I'm still a celebrity on campus, and I would really like that to die down. But the more I walk around, the more students get comfortable with me, and the sooner I stop being a novelty (please let it happen soon).
      </p>
      <p>
      I feel overwhelmed by all the things to do here. I joined futsal club and karate club at school and radio club starts next month. There's muay thai every Monday and I think I'll be buying a gym membership. Not to mention the dozens of cities and mountains accessible by a 3 hour bus ride from town. Today, for the first time, I went to a coffee shop to work instead doing so in my room. There seems to be a coffee shop every 100m so I should be busy trying new ones for a while. They also seem to be almost perfect transplants of American coffee shops. Every one has a quirky English-sounding name (currently writing this from Wipsy Coffee and Meet), a big Italian coffee machine, scones with weird toppings, and a weird brutalist/jungle combo architecture with lots of concrete and wood. 
      </p>
      <p>
      I've decided to start a Life of Pi arc and explore religion and spirituality. Contrary what my mom is thinking while she reads this, this is not an announcement of my imminent conversion to Islam. But being in a country where there are six officially recognized religions is an opportunity I don't think I'll have again. For reference, "officially recognized" means the government requires everyone to declare their religion on their driver's license. And if it isn't Islam, Christianity, Catholicism, Hinduism, Buddhism, or Confucianism, you're out of luck. Sorry atheists and agnostics. In practice, I don't think it's enforced. But the expectation here is that you follow some religion.
      </p>
      <p>
      Feeling left out, I downloaded a bunch of religious texts and I think I'll go through them and see what jumps out at me. First up to read is "The World's Religions" by Huston. I've looked, and there are Confucian temples spread across Kudus that I think I would like to visit. Buddhism is  of particular interest, and I think I'd like to spend some time in a monastery some day. My karate teacher told me that real religion is spirituality. I'll paraphrase here: Someone can practice any religion they like, going through all the motions and reading the books and saying the prayers, but it will mean nothing unless they truly arrive at the religion as a conclusion for themselves. You can be religious by reading a book and doing what it says, but that's not spirituality. At least that's what I got from what he said. Place your bets on where I'll end up by the end of this. 
      </p>
      <p>
      Missing home today. Saw a picture in my memories of my Sophos family together at Homecoming last year and it really swept over me. I think I'd be feeling the same way if I was back in the US, but it's strange to be so distant and feel a memory so raw. 
      </p>
    `
  },
  {
    id: "salatiga-getaway",
    date: "2026-09-05",
    title: "Time to Get Away (from Salatiga)",
    tags: ["update", "salatiga"],
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
      <img class="post-photo" src="photos/IMG_4583.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">Our swimming hole suspiciously close to sewage conduits.</p>
      <p>
        I've really enjoyed my time here and I will be coming back, but I miss my students that I haven't even met yet. I feel responsible for my work and I'm proud of that. We'll see if the grass is browner once I need to lock in.
      </p>
    `
  },
  {
    id: "first-post",
    date: "2026-09-02",
    title: "My First Post",
    tags: ["update", "salatiga"],
    html: `
      <p>
        Hey! I made a blog, I'll start here by porting over my latest post from Instagram. Stay tuned for more.
      </p>
      <img class="post-photo" src="photos/IMG_4349.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">Photo of Mt. Merbabu out the van window, something pleasing about this picture I think.</p>
      <p>
        Updates: Found a big ass mountain I really want to climb. Some things never change. I’m currently in Salatiga for language training and it’s a ridiculously beautiful mountain town in Central Java. Told my Colorado friend it reminds me of Indonesian Boulder. Classes are long and I spend the nights with my friends, so I don’t have a ton of time to myself, but I’m glad to be with my friends here. 10 more days and I’ll head back to my teaching site. My sister asked if I’m doing ok, so I told her this. Honestly, it’s hard. Adjusting to a new country away from everything I know is like work. And I’m in a phase where I have to put my head down and do hard, tedious work. But it’s work that gets me closer to a goal, so it’s work that I know I have to do. So yes I’m ok, thanks! More soon.
      </p>
    `
  }
];
