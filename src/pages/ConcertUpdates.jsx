import React, { useState, useEffect } from 'react';

export default function ConcertUpdates() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const API_KEY = "8TriC07oNzcy3MeIaEJQTIYNHh2ePJle"; // Ensure your API key is correct and securely stored

  // Fetch concerts on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchConcerts(latitude, longitude);
        },
        () => fetchConcerts(29.7604, -95.3698) // fallback: Houston coords
      );
    } else {
      fetchConcerts(29.7604, -95.3698); // fallback to Houston coords if geolocation is not available
    }
  }, []);

  const fetchConcerts = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${lat},${lng}&classificationName=music&apikey=${API_KEY}&size=20`
      );
      const data = await response.json();
      setConcerts(data._embedded?.events || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter concerts by date if the user chooses one
  const filteredConcerts = concerts.filter((concert) => {
    if (!filterDate) return true; // No filter applied
    const concertDate = concert.dates?.start?.localDate;
    return concertDate === filterDate;
  });

  return (
    <div className="min-h-screen bg-blue-500 bg-opacity-30 p-6 backdrop-blur-lg rounded-lg shadow-lg">
      <h1 className="text-5xl font-rubik-80s animate-neon-pulse-yellow mb-6 text-center">Concerts Near You</h1>

      {/* Date filter input */}
      <div className="mb-4 text-center">
        <label className="mr-2 font-medium">Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid layout for concerts */}
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredConcerts.map((concert) => {
          const venue = concert._embedded?.venues?.[0];
          const imageUrl = concert.images?.[0]?.url;

          return (
            <div
              key={concert.id}
              className="p-4 border max-w-sm rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg h-90"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={concert.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{concert.name}</h2>
              <p className="text-sm text-gray-500">
                {new Date(concert.dates?.start?.dateTime).toLocaleDateString()}
              </p>
              {venue && (
                <p className="font-medium">
                  Venue: {venue.name}, {venue.city?.name}
                </p>
              )}
              {concert.url && (
                <a
                  href={concert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-1 block"
                >
                  Learn More / Tickets
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



