import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* -------------------- DATA -------------------- */
function BlogSection({ title, year, text, image, reverse }) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-10 items-center my-16 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-full md:w-1/2 rounded-2xl shadow-xl object-cover mb-6 md:mb-0"
      />
      <div className="md:w-1/2 md:pl-8">
        <h2 className="text-3xl font-bold mb-2">
          {title} <span className="text-gray-400">({year})</span>
        </h2>
        <p className="text-lg leading-relaxed text-gray-200">{text}</p>
      </div>
    </div>
  );
}

const disasters = [
{
  id: "central-texas-floods",
  title: "Central Texas Floods",
  year: 2025,
  description:
    "After the devastating Central Texas floods in 2025, artists and community leaders came together to support those affected through music. A benefit concert titled 'Banding Together for Texas: A Night of Healing, Hope, and Music' featured performers and guests such as Kelly Clarkson, Jon Randall, Lukas Nelson, Lyle Lovett, Mack Brown, Emmanuel Acho, and Matthew McConaughey. The event raised over $8.5 million to help impacted communities, showing how music can unite people, provide emotional healing, and inspire collective recovery after tragedy.",
  sources: [
    {
      label: "JK Livin Foundation – Banding Together for Texas",
      url: "https://jklivinfoundation.org/events-post/banding-together-for-texas-a-night-of-healing-hope-and-music/",
    },
  ],
  images: [
    {
      src: "concert-healing.jpg",
      alt: "Artists performing at Banding Together for Texas",
    },
    {
      src: "community-support.jpg",
      alt: "Community gathering for flood recovery",
    },
  ],
},

{
  id: "hurricane-ike",
  title: "Hurricane Ike",
  year: 2008,
  description:
    "When Hurricane Ike struck Texas in 2008, widespread destruction left many families displaced and in need of support. In response, local Houston-area bands organized benefit concerts to raise money and collect donations for shelters hosting hurricane evacuees. These performances offered not only financial assistance but also a sense of solidarity and hope, reminding affected communities that they were not alone during recovery.",
  sources: [
    {
      label: "National Weather Service – Hurricane Ike",
      url: "https://www.weather.gov/lch/ikemain",
    },
    {
      label: "Houston Chronicle – Ike Relief Concerts",
      url: "https://www.chron.com/neighborhood/humble-news/article/ike-relief-benefit-concert-set-1638900.php",
    },
  ],
  images: [
    {
      src: "ike-damage.jpg",
      alt: "Damage caused by Hurricane Ike",
    },
    {
      src: "ike-benefit.jpg",
      alt: "Local bands hosting Hurricane Ike benefit concert",
    },
  ],
},

{
  id: "hurricane-katrina",
  title: "Hurricane Katrina",
  year: 2005,
  description:
    "After Hurricane Katrina forced thousands of New Orleans residents to evacuate to Houston, music became a powerful source of comfort for displaced communities. New Orleans brass band musicians who relocated to Houston held spontaneous performances at shelters such as the Astrodome. Their music brought joy, familiarity, and emotional relief to fellow evacuees, helping people cope with loss and uncertainty during one of the most devastating disasters in U.S. history.",
  sources: [
    {
      label: "Houston Chronicle – Katrina Brass Bands",
      url: "https://www.chron.com/culture/article/houston-brass-band-musicians-katrina-20806968.php",
    },
  ],
  images: [
    {
      src: "katrina-astrodome.jpg",
      alt: "Evacuees at the Astrodome after Hurricane Katrina",
    },
    {
      src: "brass-band.jpg",
      alt: "New Orleans brass band musicians performing in Houston",
    },
    {
      src: "katrina-music.jpg",
      alt: "Music bringing hope to Katrina evacuees",
    },
  ],
},

{
  id: "challenger",
  title: "The Challenger Disaster",
  year: 1986,
  description:
    "Following the Space Shuttle Challenger disaster, which deeply affected Houston and the NASA community, musician Jean-Michel Jarre organized a large-scale live concert titled 'Rendez-vous Houston.' Held two months after the tragedy, the concert honored the astronauts who lost their lives and celebrated the city’s resilience. An estimated 1.5 million people attended, making it one of the largest concerts ever, and demonstrating how music can serve as a powerful tribute and a means of collective healing after loss.",
  sources: [
    {
      label: "Wikipedia – Rendez-vous Houston",
      url: "https://en.wikipedia.org/wiki/Rendez-vous_Houston",
    },
  ],
  images: [
    {
      src: "challenger-memorial.jpg",
      alt: "Memorial for Challenger astronauts",
    },
    {
      src: "jarre-concert.jpg",
      alt: "Jean-Michel Jarre performing in Houston",
    },
    {
      src: "houston-crowd.jpg",
      alt: "Crowd at Rendez-vous Houston concert",
    },
  ],
},
];


/* -------------------- COMPONENT -------------------- */

export default function Resilience() {
  const [showIntro, setShowIntro] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [activeDisaster, setActiveDisaster] = useState(disasters[0].id);
  const navigate = useNavigate();

  const introText =
    "When disaster strikes Houston, music often becomes more than sound. It becomes comfort, memory, healing, and resilience. Across decades of storms, loss, and recovery, Houstonians have turned to music to survive, to connect, and to hope.";

  /* -------- Typing Effect -------- */
useEffect(() => {
  if (!showIntro) return;

  if (typedText.length < introText.length) {
    const timeout = setTimeout(() => {
      setTypedText(introText.slice(0, typedText.length + 1));
    }, 35);

    return () => clearTimeout(timeout);
  }
}, [typedText, introText, showIntro]);

  const current = disasters.find((d) => d.id === activeDisaster);

  return (
    <div className="min-h-screen bg-blue-300 text-white p-6 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            className="max-w-3xl text-center mt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-xl leading-relaxed mb-8">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>

            {typedText.length === introText.length && (
              <button
                onClick={() => setShowIntro(false)}
                className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
              >
                Wow, let’s check it out!
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full max-w-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-4xl font-bold text-center mb-8">
              Music & Resilience
            </h1>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {disasters.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDisaster(d.id)}
                  className={`px-4 py-2 rounded-lg text-lg transition-all duration-300 ${
                    activeDisaster === d.id
                      ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white"
                      : "bg-white/20 hover:bg-purple-700"
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>

            {/* Content Card */}
            <div className="bg-white/10 p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold mb-2">
                {current.title} ({current.year})
              </h2>

              {/* Description */}
              <p className="leading-relaxed mb-6">{current.description}</p>

              {/* Images */}
              <div className="flex gap-6 mb-6">
                {current.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    className="w-1/3 rounded-2xl shadow-xl object-cover"
                  />
                ))}
              </div>

              {/* Sources */}
              <div className="text-sm text-gray-300 mb-6">
                <p className="font-semibold mb-1">Sources:</p>
                <ul className="list-disc list-inside space-y-2">
                  {current.sources.map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-white"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/social")}
                className="bg-pink-500 hover:bg-pink-600 px-5 py-2 rounded-lg"
              >
                Share your experience →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
