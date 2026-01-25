import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Houston neighborhoods with YouTube links
const neighborhoods = [
  {
    name: "Downtown",
    description: "Hip-hop and R&B hotspots.",
    artists: ["Trae tha Truth", "Bun B", "Z-Ro"],
    video: "4m1EFMoRFvY",
    coordinates: [
      [29.757, -95.366],
      [29.759, -95.366],
      [29.759, -95.364],
      [29.757, -95.364],
    ],
  },
  {
    name: "Montrose",
    description: "Indie and alternative music venues.",
    artists: ["Shakey Graves", "Spoon fans", "Local indie bands"],
    video: "dQw4w9WgXcQ",
    coordinates: [
      [29.740, -95.393],
      [29.742, -95.393],
      [29.742, -95.387],
      [29.740, -95.387],
    ],
  },
  {
    name: "Third Ward",
    description: "Historic jazz and blues scene.",
    artists: ["Milt Larkin: A Third Ward native whose band in the 1930s was a dominating force in the \"territory\". He advocated the \"Texas Tenor\" sound so that his saxophonists would be heard above the rest of the band.", "Arnett Cobb & Illinois Jacquet: They were both sax players of great repute from Jack Yates High School. These artists defined the \"Texas Tenor\" sound, which features honking low notes and squeaking high notes.", "Beyoncé: Raised in the Third Ward, her music frequently references local landmarks and the neighborhood's rich marching band tradition."],
    video: "4m1EFMoRFvY",
    coordinates: [
      [29.728, -95.354],
      [29.732, -95.354],
      [29.732, -95.348],
      [29.728, -95.348],
    ],
  },
];

// Custom pink star icon
const starIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF69B4'%3E%3Cpath d='M12 .587l3.668 7.431 8.2 1.193-5.934 5.783 1.401 8.172L12 18.897l-7.335 3.86 1.4-8.172L.13 9.211l8.2-1.193z'/%3E%3C/svg%3E",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

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

        {neighborhoods.map((n, idx) => (
          <Marker
            key={idx}
            position={getCenter(n.coordinates)}
            icon={starIcon}
            eventHandlers={{
              click: () => {
                setSelectedNeighborhood(n);
                setPlayingVideo(false); // stop any previous audio
              },
            }}
          />
        ))}
      </MapContainer>

      {selectedNeighborhood && (
        <div className="map-popup">
          <h2 className="text-xl font-semibold">{selectedNeighborhood.name}</h2>
          <p>{selectedNeighborhood.description}</p>
          <p className="mt-2 font-medium">Artists:</p>
          <ul className="list-disc list-inside">
            {selectedNeighborhood.artists.map((artist, i) => (
              <li key={i}>{artist}</li>
            ))}
          </ul>

          {/* Play/Stop Buttons */}
          {selectedNeighborhood.video && !playingVideo && (
            <button

              onClick={handlePlay}
            >
              ▶ Play Sample
            </button>
          )}
          {selectedNeighborhood.video && playingVideo && (
            <button

              onClick={handleStop}
            >
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
    </div>
  );
};

export default HoustonMap;



