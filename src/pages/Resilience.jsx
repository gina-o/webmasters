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
    id: "harvey",
    title: "Hurricane Harvey",
    year: 2017,
    description:
      "When Harvey hit Houston, the Houston Symphony played at shelters across Houston and gave over 20 performances over 9 days, despite members being personally affected by the disaster. The orchestra also played a Mozart string quartet for a blind evacuee who had been unable to calm down for days, providing comfort through the power of music. Local artists and organizations also stepped up. Nameless Sound organized benefit concerts and music therapy sessions for affected communities, while Music Doing Good provided instruments and music lessons to children in shelters, helping them find joy amid the chaos. After Harvey, Music Doing Good partnered with individuals, organizations, and retail vendors to collect instruments. They then refurbished and redistributed them to low-income families who lost instruments in the flooding and could not afford to buy new ones.",
    sources: [
      {
        label: "National Weather Service",
        url: "https://www.weather.gov/hgx/hurricaneharvey",
      },
      {
        label: "Houston Symphony",
        url: "https://houstonsymphony.org/32604-2/",
      },
      {
        label: "PaperCity – Nameless Sound",
        url: "https://www.papercitymag.com/arts/houston-artists-recover-hurricane-harvey-band-together",
      },
      {
        label: "Chron – Music Doing Good",
        url: "https://www.chron.com/neighborhood/bellaire/news/article/Music-Doing-Good-nonprofit-brings-music-to-12249611.php",
      },
    ],
    images: [
      {
        src: "symphony.jpg",
        alt: "Houston Symphony during Harvey",
      },
      {
        src: "nameless.jpg",
        alt: "Nameless Sound's concert for Harvey victims",
      },
      {
        src: "music.jpg",
        alt: "Music Doing Good's instrument distribution",
      },
    ],
  },
  // Continue the rest of the disaster objects here
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
