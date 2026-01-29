import React, { useState, useEffect, useRef } from 'react';

export default function ConcertUpdates() {
    const concertRef = useRef(null);
    const scroll = () => {
            concertRef.current?.scrollIntoView({ behavior: "smooth" });
          };
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
    <div className="min-h-screen bg-[url('/houmenu.png')] py-10 bg-cover">
                  <section className="relative h-screen flex items-center justify-center">


                    <div className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white/20 text-center">
                      <h1 className="text-4xl mb-4 text-white font-rubik-80s">
                        Concerts Near You
                      </h1>

                      <p className="text-lg max-w-2xl mx-auto">
                        Find other ways to embrace the music
                      </p>

                      <button
                        onClick={scroll}
                        className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
                      >
                        See Concerts
                      </button>
                    </div>
                  </section>
<div className="content">
          <section ref={concertRef} className="max-w-6xl mx-auto p-4">
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



