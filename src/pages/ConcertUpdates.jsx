import React, { useState, useEffect } from "react";

export default function ConcertUpdates() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(""); 
  const API_KEY = "8TriC07oNzcy3MeIaEJQTIYNHh2ePJle"; 

  

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
      fetchConcerts(29.7604, -95.3698);
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

  // Filter concerts by date if user chooses one
  const filteredConcerts = concerts.filter((concert) => {
    if (!filterDate) return true; // no filter applied
    const concertDate = concert.dates?.start?.localDate;
    return concertDate === filterDate;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Concerts Near You</h1>

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

      {loading ? (
        <p className="text-center">Loading concerts...</p>
      ) : filteredConcerts.length === 0 ? (
        <p className="text-center">No concerts found for this date.</p>
      ) : (
        <div className="grid gap-6">
          {filteredConcerts.map((concert) => {
            const venue = concert._embedded?.venues?.[0];
            const imageUrl = concert.images?.[0]?.url; 

            return (
              <div
                key={concert.id}
                className="p-4 border rounded-lg shadow-lg bg-white"
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
      )}
    </div>
  );
}
