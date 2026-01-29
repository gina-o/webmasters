import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper: extract YouTube video ID from full URL
const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
  );
  return match ? match[1] : null;
};

// Timeline data
const timelineEvents = [

    {
    id: 1,
    year: 1940,
    title: "Houston Music Era Begins",
    image: "/SugarHill.jpg",
    description:
      "The 1940s marked the beginning of Houston’s music era. After experimenting with recording technology, William Russel “Bill” Quinn founded Quinn Recording, which later became SugarHill Recording Studio, the oldest operating studio in the nation. Many other recording studios were created, such as Peacock Records and Freedom Records. Goree Carter, a singer, guitarist, drummer, and songwriter, released “Rock Awhile,” one of the first rock n’ roll recordings in the U.S. Blues were very popular during this period. Samuel John Hopkins, now known as Lightnin’ Hopkins, was discovered while singing in Houston’s Third Ward. In 1946, he traveled with Wilson Smith to Los Angeles, where they recorded 12 tracks.",
    video: "https://www.youtube.com/watch?v=hrfPbLxxZRw",
  },
  {
    id: 2,
    year: 1950,
    title: "Zydeco and Elvis Covers",
    description:
      "In the 1950s, Louisiana native Clifton Chenier, a migrant to Bayou City in the 40s released his first album titled “Louisiana Blues & Zydeco.” As the inventor of the zydeco, Chenier actually first introduced his genre in Houston’s Fifth Ward. One of Elvis Presley’s most famous covers, “Hound Dog,” was recorded by Big Mama Thornton in 1954, marking a new kind of music that would help define the 20th-century era. William Russell Quinn, the founder of Gold Star Records, moved his studio to his family home at 5628 Brock Street. The facility expanded throughout the 50s, becoming the primary facility for D Records labels.",
    searchTerm: "Clifton_Chenier",
    video:
      "https://www.youtube.com/watch?v=R-W9f38qdVs&list=RDR-W9f38qdVs&start_radio=1",
  },
  {
    id: 3,
    year: 1960,
    title: "Blues and Jazz Rise",
    description:
      "The 1960s brought forth Lightnin’ Hopkins, a Houstonian icon and the city’s king of blues’s album “The Great Electric Show and Dance.” Gold Star Studio recorded for country artists such as George Jones, Hank Locklin, Willie Nelson, and Floyd Tillman. It was later sold to International Artists in 1968 after being leased by J.L. Patterson. In 1967, the TSU Tornadoes worked with Archie Bell & The Drells to create music for their hit single “Tighten Up,” which would be released the next year. Joe Sample and Wilton Felder, members of the jazz band The Jazz Crusaders, play on The Jackson 5’s first national hit, “I Want You Back.”",
    image: "/light.jpg",
    video:
      "https://www.youtube.com/watch?v=lK5zYI86wIw&list=RDlK5zYI86wIw&start_radio=1",
  },
  {
    id: 4,
    year: 1990,
    title: "Houston Rap & R&B",
    description:
      "The Geto Boys achieved national success with “Mind Playing Tricks,” which sold over a million copies and helped define Houston’s unique “gangsta rap” style. In 1993, H-Town’s “Knockin’ Da Boots” contributed greatly to Houston’s R&B culture. At the same time, Eightball & MJL released “Comin’ Out Hard” on Suave House. Houstonian drummer and composer Chris “Daddy” Dave became Mint Condition’s drummer on his debut. DJ Screw released numerous classics on Bigtyme Recordz, such as “3 ‘N The Mornin’” and “All Screwed Up Vol. 2” in 1995. Three years later, he opened the Screwed Up Records & Tapes on Cullen Boulevard. In the same year, 1998, Fat Pat’s classic “Ghetto Dreams” was released posthumously, just one month after his death.",
    image: "/Scarface.jpg",
    searchTerm: "The_Geto_Boys",
    video: "https://www.youtube.com/watch?v=ntR6aoL53rY&list=PLeA4iia333Q06sxq7gE90XjYG0dZIwl9j",
  },
  {
    id: 5,
    year: 2000,
    title: "Beyoncé & Houston Icons",
    description:
      "Beyoncé releases her first album, “Dangerously in Love,” which would later win a Grammy. Throughout the 2000s, she continued to amass US Billboard Hot 100 number-one singles, with her hits such as “Crazy in Love.” Mike Jones releases his debut single, “Still Tippin’,” featuring Slim Thug, Paul Wall, and Swisha House. “Purple World” by Big Moe reaches #3 on Billboard’s Top R&B/Hip-Hop Albums Charts. Big Moe’s last album, “Unfinished Business,” was released after his death in 2007, following heart-related issues.",
    searchTerm: "Beyoncé",
    video:
      "https://www.youtube.com/watch?v=2aqA6EHVg0w",
  },
  {
    id: 6,
    year: 2010,
    title: "Modern Houston Music",
    description:
      "Robert Glasper won his first Grammy for “Best R&R Album” for Black Radio in 2012. He later went on to score films along with many other prominent musicians at the time. In 2016, Beyoncé’s sister, Solange Knowles, won a Grammy for “Cranes in the Sky.” At the same time, her sister went on her highest-grossing tour to promote her album, Lemonade. Astroworld, Travis Scott’s third studio album, was released in 2018; he additionally produced his first #1 single, “Sicko Mode” with Drake.",
    image: "/travis.jpg",
    video:
      "https://www.youtube.com/watch?v=5p2lmpPlT2M&list=RD5p2lmpPlT2M&start_radio=1",
  },
  {
    id: 7,
    year: "Now",
    title: "What's on the move now?",
    description:
      "In 2021, Megan Thee Stallion won three Grammys, with Beyoncé becoming the most-awarded and most-nominated artist as of 2025, having a total of 35 wins and 99 nominations. Houston remains a center for tourists and residents alike to indulge in its rich and diverse selection of music across the metropolis. The city’s Houston Symphony holds over 100 concerts annually in Jones Hall. Shows and performances are held in the NRG Stadium as well as the Toyota Center, varying from the Houston Ballet all the way to Taylor Swift’s Eras Tour performance.",
    image: "/Megan.jpg",
    video:
      "https://www.youtube.com/watch?v=MEV_oYtSc18&list=PL1z9R7TJXY8yD_zFr4ez-rlGGgfalAfvy&index=18",
  },
];


export default function TimelinePage() {
  const [activeEvent, setActiveEvent] = useState(timelineEvents[0].id);
  const [eventsWithImages, setEventsWithImages] = useState(timelineEvents);
  const [playingVideo, setPlayingVideo] = useState(false);

  const currentEvent = eventsWithImages.find((e) => e.id === activeEvent);

  // Fetch image from Wikimedia (with fallback)
  const fetchWikiImage = async (title) => {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=400&origin=*`;
      const response = await fetch(url);
      const data = await response.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      return pages[pageId]?.thumbnail?.source || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      const updated = await Promise.all(
        timelineEvents.map(async (event) => {
          const wikiImage = await fetchWikiImage(event.searchTerm);
          return {
            ...event,
            image: wikiImage || event.image || null,
            videoId: getYouTubeId(event.video),
          };
        })
      );
      setEventsWithImages(updated);
    };
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-rubik-80s animate-neon-pulse mb-8 text-center font-['Workbench']">
        Houston Music Through Time
      </h1>

      {/* Timeline */}
      <div className="flex space-x-4 overflow-x-auto mb-8">
        {eventsWithImages.map((event) => (
          <button
            key={event.id}
            onClick={() => {
              setActiveEvent(event.id);
              setPlayingVideo(false);
            }}
            className={`px-4 py-2 rounded-lg ${
              event.id === activeEvent
                ? "bg-cyan-700"
                : "bg-white/20 hover:bg-[#92BCCF]"
            }`}
          >
            {event.year}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="max-w-4xl w-full bg-white/10 p-8 rounded-2xl min-h-[500px] max-h-[650px] text-center overflow-hidden">

        <h2 className="text-3xl font-bold">{currentEvent.title}</h2>
       <div className="mb-4 max-h-48 overflow-y-auto text-left pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">

  <p className="whitespace-pre-line leading-relaxed">
    {currentEvent.description}
  </p>
</div>


        <div className="relative h-64 flex justify-center items-center">
          <AnimatePresence mode="wait">
            {currentEvent.image && (
              <motion.img
                key={currentEvent.image}
                src={currentEvent.image}
                className="absolute max-h-64 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>

        {currentEvent.videoId && !playingVideo && (
          <button
            onClick={() => setPlayingVideo(true)}
            className="bg-red-500"
          >
            ▶ Play Sample
          </button>
        )}

        {playingVideo && (
          <iframe
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/${currentEvent.videoId}?autoplay=1`}
            allow="autoplay"
            title="music"
          />
        )}
      </div>

      {/* Sources stay untouched */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        Sources: Houstonia, Houston Music Live, Camden Living, TSHA, Grammy
      </div>
    </div>
  );
}





