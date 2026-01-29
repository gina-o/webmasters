import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
  );
  return match ? match[1] : null;
};
// Houston neighborhoods with YouTube links
const neighborhoods = [
  {
    name: "Downtown",
    description:
      "Houston has been shaped by multiple influences when it comes to music, ranging from Creole and Cajun traditions from Louisiana, to the blues styles brought over by Black musicians from East Texas to the folk music of ethnic Mexicans that live and work along the Rio Grande Valley. The combination of these genres has created a unique sound known as the 'Texas Gulf Coast Sound'.",
    artists: ["Trae tha Truth", "Bun B", "Z-Ro"],
    video: "https://www.youtube.com/watch?v=X-tKXPphn5o&list=RDX-tKXPphn5o&start_radio=1",
    coordinates: [
      [29.757, -95.366],
      [29.759, -95.366],
      [29.759, -95.364],
      [29.757, -95.364],
    ],
  },
  {
    name: "Third Ward",
    description:
      "Historically known as the 'Black Harlem of the South,' the Third Ward is the center of Black culture and the professional class in Houston, Texas.",
    musicalStyles: "Jazz, R&B, Modern Pop, Soul",
    keyArtists: [
      "Milt Larkin: A Third Ward native whose band in the 1930s was a dominating force in the 'territory.' He advocated the 'Texas Tenor' sound so that his saxophonists would be heard above the rest of the band.",
      "Arnett Cobb & Illinois Jacquet: They were both sax players of great repute from Jack Yates High School. They defined the 'Texas Tenor' sound, which features honking low notes and squeaking high notes.",
      "Beyoncé: Raised in the Third Ward, her music frequently references local landmarks and the neighborhood's rich marching band tradition.",
    ],
    video: "https://www.youtube.com/watch?v=unW0RyC8jr4",
    coordinates: [
      [29.728, -95.354],
      [29.732, -95.354],
      [29.732, -95.348],
      [29.728, -95.348],
    ],
  },
  {
    name: "Fifth Ward",
    description:
      "The area began as a working-class neighborhood and later became a key site for the development of gritty, amplified blues and early hip-hop.",
    musicalStyles: "Post-war Blues, Gospel, Southern Hip-Hop",
    keyArtists: [
      "Sam Lightnin' Hopkins: A leading blues musician who recorded more than 100 songs at the Gold Star studio in Houston. He represented the transition of rural East Texas blues into a city context.",
      "Don Robey: He founded Peacock Records and Duke Records in the Fifth Ward. He was a ruthless but visionary businessman who managed the careers of Bobby 'Blue' Bland and Big Mama Thornton.",
      "The Geto Boys: By bringing 'horrorcore' themes with social commentary, this group expanded Southern rap in the late 1980s. Their work presented the area's violence, hardship, and daily pressures in a way that was both confrontational and reflective.",
    ],
    video: "dQw4w9WgXcQ",
    coordinates: [
      [29.740, -95.393],
      [29.742, -95.393],
      [29.742, -95.387],
      [29.740, -95.387],
    ],
  },
  {
    name: "Frenchtown",
    description:
      "A four-block square area settled by Creoles of color migrating from Louisiana, with many linked to displacement from the Great Mississippi Flood of 1927.",
    musicalStyles: "Zydeco, 'La-La' (rural acoustic Creole music), Swamp Pop",
    keyArtists: [
      "Clifton Chenier: He took rural Louisiana accordion music and blended it with Houston's urban R&B and blues, creating modern Zydeco.",
    ],
    video: "https://www.youtube.com/watch?v=or51rwiykNQ&list=PLlnCCMRPTrS1Mqah77x4ULv8MGYLxdXHf&index=5",
    coordinates: [
      [29.728, -95.393],
      [29.730, -95.393],
      [29.730, -95.389],
      [29.728, -95.389],
    ],
  },
];

// Color mapping for neighborhoods
const neighborhoodColors = {
  Downtown: { color: "#93a3f9", fillColor: "#93a3f9" }, // Tomato
  "Third Ward": { color: "#86bcf2", fillColor: "#86bcf2" }, // Dodger Blue
  "Fifth Ward": { color: "#a7d8a7", fillColor: "#a7d8a7" }, // Lime Green
  Frenchtown: { color: "#fff2a6", fillColor: "#fff2a6" }, // Gold
};

// Helper to find center of polygon
const getCenter = (coords) => {
  const lats = coords.map((c) => c[0]);
  const lngs = coords.map((c) => c[1]);
  return [
    lats.reduce((a, b) => a + b, 0) / lats.length,
    lngs.reduce((a, b) => a + b, 0) / lngs.length,
  ];
};

const HoustonMap = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(false);

  const handlePlay = () => setPlayingVideo(true);
  const handleStop = () => setPlayingVideo(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Houston Music Map</h1>

      <MapContainer
        center={[29.7604, -95.3698]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {neighborhoods.map((n, idx) => {
          const colorInfo = neighborhoodColors[n.name] || { color: "#000000", fillColor: "#000000" };

          return (
            <Polygon
              key={idx}
              positions={n.coordinates}
              color={colorInfo.color} // Border color
              fillColor={colorInfo.fillColor} // Fill color
              fillOpacity={0.5}
              eventHandlers={{
                click: () => {
                  setSelectedNeighborhood(n);
                  setPlayingVideo(false); // stop any previous audio
                },
              }}
            />
          );
        })}
      </MapContainer>

      {selectedNeighborhood && (
        <div className="map-popup mt-4 p-4 border rounded bg-white shadow-lg">
          <h2 className="text-xl font-semibold">{selectedNeighborhood.name}</h2>
          <p>{selectedNeighborhood.description}</p>

          {/* Display Musical Styles and Artists if available */}
          {selectedNeighborhood.musicalStyles && (
            <>
              <p className="mt-2 font-medium">Musical Styles:</p>
              <p>{selectedNeighborhood.musicalStyles}</p>
            </>
          )}
          {selectedNeighborhood.keyArtists && (
            <>
              <p className="mt-2 font-medium">Key Artists:</p>
              <ul className="list-disc list-inside">
                {selectedNeighborhood.keyArtists.map((artist, i) => (
                  <li key={i}>{artist}</li>
                ))}
              </ul>
            </>
          )}

          {/* Play/Stop Buttons */}
          {selectedNeighborhood.video && !playingVideo && (
            <button onClick={handlePlay} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              ▶ Play Sample
            </button>
          )}
          {selectedNeighborhood.video && playingVideo && (
            <button onClick={handleStop} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              ■ Stop
            </button>
          )}

          {/* Hidden YouTube iframe */}
          {selectedNeighborhood.video && playingVideo && (
            <div style={{ display: "none" }}>
              <iframe
                width="0"
                height="0"
                src={`https://www.youtube.com/embed/${selectedNeighborhood.video}?autoplay=1&controls=0`}
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
                title={`${selectedNeighborhood.name} sample`}
              ></iframe>
            </div>
          )}
        </div>
      )}

      <footer className="text-center text-white mt-6 text-sm">
        <p>Sources:</p>
        <ul className="list-disc list-inside">
          <li><a href="https://www.txst.edu/ctmh/publications/journal/issues/jtmh-vol-21/vol-21-houston-roots.html">Source 1</a></li>
          <li><a href="https://houstonhistorymagazine.org/2024/04/musical-migrations-the-sonic-traditions-of-houston-brought-and-shaped-by-migrants-in-the-early-twentieth-century/">Source 2</a></li>
          <li><a href="https://meadowspropertygroup.com/2024/04/the-legacy-of-houston-music-scene-from-beyonce-to-zz-top/">Source 3</a></li>
          <li><a href="https://dokumen.pub/houston-bound-culture-and-color-in-a-jim-crow-city-9780520958531.html">Source 4</a></li>
          <li><a href="https://cooglife.com/2023/08/six-wards-the-history-outlining-houston/">Source 5</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default HoustonMap;


