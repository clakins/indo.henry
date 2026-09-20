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
    id: "firstweek",
    date: "2026-09-20",
    title: "Startup",
    tags: ["update", "kudus"],
    html: `
      <img class="post-photo" src="photos/IMG_5115.jpeg" alt="Placeholder example photo">
      <p class="post-photo-caption">My school! They literally run it like the Navy.</p>
      <p>
        I'm starting to feel like I can actually do this. It's been a good couple of days. I had my first lesson planning session with my co-teachers on Friday, and it went well. They seem open to new ideas and I can tell they care about their students. We planned out the coming week, but I had to explain to them what "crap hitting the fan" meant and how likely it was to happen as we get used to this co-teaching system. Tomorrow I have my first real class. I hope I like it because I will have about 1200 more to teach after this one! We're starting with teaching about self-introductions, and I'll also have the chance to tell my English Corner class (once a week special topic) about Arizona and my family back home.
      </p>
      <p>
        In case you don't follow my school's Instagram and haven't seen the videos (@smkwisudhakaryakudus, I highly recommend it), yesterday morning was the Nautical Sciences student graduation. Think of a high school pep rally, but everyone is in full naval dress uniforms and martial arts are heavily involved. I was honestly completely unprepared for this event, so I'll give a quick synopsis and hopefully it conveys how culturally rich and entirely unique it was. 
      </p>
      <p>
        Once were were all seated (us being teachers, parents, younger students, and "men from industry" which I can only assume means they were fairly important Indonesian shipping magnates), the students were lined up in drill formation and went through the classic national anthem and Pancasila (similar to saying pledge of allegiance, I think?) routine. It's all very official and disciplined; picture a military boarding school in the US. What broke that similarity for me was the dance routine that came next. I don't know much about it, but its a traditional dance called Caping Ngancak (hat dance or something like that) This dance is probably at least four or five hundred years old; the age of the culture here is incredible (sidenote, mom am I using semicolons correctly?).
      </p>
      <p>
        After that, we got a 20 minute maritime demonstration in which student re-enacted at-sea firefighting (with full hoses and oxygen tanks), abandon ship procedures, and a water rescue. Keep in mind, all of this was wrapped up in a Titanic theme, complete with actors playing Jack and Rose and "My Heart Will Go On" playing in the background. I can't make this up. Really pulled at my heartstrings. The captain also pretended to down with his ship, clutching his heart and falling dead behind the ship's wheel.
      </p>
      <img class="post-photo" src="photos/IMG_5142.jpeg" alt="Placeholder example photo">
      <p class="post-photo-caption">Part of the Pencak Silat Demonstration.</p>
      <p>
        There's an old Javanese martial art here called Pencak Silat, which is supposedly what the Indonesians used to fight the Dutch when they arrived. Where it differs from  martial arts I'm familiar with is in the mystical aspect that can supposedly repel attacks and protect you from injury. A few students who train in Pencak Silat came out with cinder blocks for a live demo. One kid smashed three of them clean through with his elbow. The next kid placed suspended himself across two chairs (sort of like and H with him as the center bar). Others put three cinder blocks on his chest (which was suspended in mid-air, just his shoulders and legs on the chair), and proceeded to smash the cinder blocks on him with a sledgehammer. He got up unphased and ran off.
      </p>
      <p>
        My personal favorite part was the marching band. It's reminiscent of high school marching band shows you'd see at halftime of a football game, but everyone is in feathered headdress, there are eight acrobatic acts going on simultaneously, and two drummers are running around dressed as walruses. And the sound was genuinely unreal. I won't lie I had chills. I'll get a video out eventually for you to see.
      </p>
      <p>
        At the end, every person in the school, students, parents, and teachers, got together for a flash mob to a popular Indonesian song. Luckily, my friends taught me this one in Salatiga, so everyone was impressed that I knew the moves. For all of my friends who I went line dancing with back in Arizona, I thought of you. it was crazy nostalgic. 
      </p>
      <p>
        Overall a very rewarding experience and the local news guy interviewed me afterward. There's genuinely no subtlety here.
      </p>
      <img class="post-photo" src="photos/IMG_5225.jpeg" alt="Placeholder example photo">
      <p class="post-photo-caption">The main temple in the complex at Semarang, three others are not pictured.</p>
      <img class="post-photo" src="photos/IMG_5224.jpeg" alt="Placeholder example photo">
      <p class="post-photo-caption">A super tuff pic from our professional temple photoshoot.</p>
      <p>
        After the ceremony, I headed to Semarang (about a 2 hour bus ride) to meet my friends. The highlight of my time there, aside from the reunion with my Fulbright friends, was definitely the temple of Sam Poo Kang (yes, I laughed) which is a reconstruction of a Chinese temple area originally established by Zheng He, the Chinese naval explorer. I was pleasantly surprised at how peaceful the temple was and we were lucky enough to observe Chinese worshippers coming to burn incense. 

        I've been writing this post over the past couple days, so hopefully it sums up everything that has happened. Longform writing is difficult and uncomfortable, and I find myself trying to emulate other people's voices because I haven't found my own yet. So thank you for the support so far, I hope these are fun to read. Sampai jumpa!
      </p>
    `
  },
  {
    id: "backinkudus",
    date: "2026-09-15",
    title: "School's In",
    tags: ["update", "kudus"],
    html: `
      <img class="post-photo" src="photos/IMG_5064.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">My first class! Man I hope they like me.</p>
      <p>
        Yesterday was my first day of class as a teacher. What a weird feeling to be on the other side. It's hard, probably harder than being a student. After seeing an Indonesian classroom, I'm struck by the differences between it and an America one. I figured this would be a good chance to do some general cultural comparison so everyone back home knows what it's like here so far. Obviously, this is based purely on opinion and observation, and I have a shockingly surface-level grasp so far on how life works here. But I wanted to share my initial thoughts so I can compare them to my thoughts at the end. 
      </p>
      <p>
        Indonesian students stay in their classroom and rotate teachers. I can't for the life of me figure out why this is a good idea and I honestly feel bad for the students who have to sit in one chair with the same group of 40 all day with nothing but a couple thirty minute breaks of freedom. It also means that teacher's can't set up or decorate their classrooms, giving the whole thing a rather sterile feel. 
      </p>
      <p>
        On the plus side, the cafeteria operates in the form of a roadside local kitchen. Instead of processed frozen food, it's home-cooked by someone's grandma who sets up here stove and a stool and cooks chickens right in front of you. It's a home-cooked meal every day. 
      </p>
      <p>
        Beyond school, there's a lot of differences. No one walks here, it's all mopeds. If you tell someone you're walking more than 5 minutes to go somewhere, they look at you like you're crazy. The moped transportation system is so efficient here I can call the moped equivalent of an Uber, have it arrive in 2 minutes, pay the driver the equivalent of $1, and weave through traffic to any destination in the city within 15 minutes. How major cities in the US have not adopted this system is beyond me. The flip side of that is that pollution from hundreds of thousands of mopeds (pretty much every person over the age of 14) is rough. I'm hoping the rainy season dampens some of the smoke, but its accepted here that pollution is ubiquitous. 
      </p>
      <p>
        People here seem happier (or at least more good-natured) than in the US. This one is hard to quantify. Many of the same problems afflicting the US are as bad or worse here. Wealth inequality and rising prices are making some cities unlivable and incomes have not increased (for reference, the average yearly income in Kudus is 40 million rupia, or 2500 dollars, the currency conversion rate is 17,000:1). But, even with all of this, people seem positive. Maybe it's the bias of being an American and being treated differently, I can't get around that, but people here are social and buy each other dinner and bring back gifts. They go out of their way to maintain social appearances in a way that seems both strangely unhealthy and incredibly pure of heart. I haven't deciphered it yet. 
      </p>
      <img class="post-photo" src="photos/IMG_5085.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">A restaurant today where I met yet more happy people.</p>
      <p>
        *Update: I read an account from a previous Fulbright, who noted that people don't complain here. I think that sums it up pretty well. People may not be happy, but communal social norms dictate that putting on a face is better than vocalizing your problems. I can't yet tell if it's a positive or negative thing. Are people ignoring a problem and suffering because of it? Or does keeping your problems to yourself protect your mindset and keep you going? I think it's not a toxic bottling-up so much as a choice to accept hardship but choose to focus on better things. I haven't gotten past the surface level of it yet.  
      </p>
      <img class="post-photo" src="photos/squat-toilet.jpg" alt="Placeholder example photo">
      <p class="post-photo-caption">No imagination necessary here.</p>
      <p>
        Last difference here. Western toilets are rare and squat toilets are the norm. No toilet paper, no bidet, just some water in a bucket next to you. Enough said. Makes me think of Kerouac's "dirty azzhole" passage from Big Sur. 
      </p>
      <p>
        Lots more to learn, but I'm feeling better about it. Kudus is starting to feel like home. I walked through my neighborhood yesterday and sat down for coffee with three new friends. We talked for an hour. I made friends with the cashier at the restaurant and a husband and wife selling coconuts on the side of the road. Friendly people. More to come, salamat malam.
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
