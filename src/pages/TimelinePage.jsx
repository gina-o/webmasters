import { useState } from "react";

const timelineEvents = [
  {
    id: 1,
    year: 1900,
    title: "Houston Founded",
    description: "Houston is officially founded, marking the beginning of the city’s history.",
    image: "https://via.placeholder.com/400x200?text=Houston+Founded",
  },
  {
    id: 2,
    year: 1920,
    title: "Music Scene Emerges",
    description: "Houston's music scene begins to develop with early jazz and blues.",
    image: "https://via.placeholder.com/400x200?text=Music+Scene",
  },
  {
    id: 3,
    year: 1960,
    title: "Cultural Explosion",
    description: "Houston sees a rise in cultural events, festivals, and artistic movements.",
    image: "https://via.placeholder.com/400x200?text=Cultural+Explosion",
  },
  {
    id: 4,
    year: 2000,
    title: "Modern Era",
    description: "The city becomes a hub for music, technology, and community-driven events.",
    image: "https://via.placeholder.com/400x200?text=Modern+Era",
  },
];

export default function TimelinePage() {
  const [activeEvent, setActiveEvent] = useState(timelineEvents[0].id);

  const currentEvent = timelineEvents.find((e) => e.id === activeEvent);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold animate-neon-pulse mb-8 text-center">
        Houston Through Time
      </h1>

      {/* Timeline navigation */}
      <div className="flex space-x-4 overflow-x-auto mb-8">
        {timelineEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => setActiveEvent(event.id)}
            className={`px-4 py-2 rounded-lg transition ${
              event.id === activeEvent
                ? "bg-purple-600 text-white"
                : "bg-white/20 text-white hover:bg-purple-700"
            }`}
          >
            {event.year}
          </button>
        ))}
      </div>

      {/* Event Card */}
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg text-center transition-all duration-500">
        <h2 className="text-3xl font-bold mb-2">{currentEvent.title}</h2>
        <p className="text-lg mb-4">{currentEvent.description}</p>
        {currentEvent.image && (
          <img
            src={currentEvent.image}
            alt={currentEvent.title}
            className="mx-auto rounded-lg mb-4"
          />
        )}
      </div>
    </div>
  );
}
