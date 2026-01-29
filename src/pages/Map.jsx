import HoustonMap from "../components/HoustonMap";

const MapPage = () => {
    const mapRef = useRef(null);

    const scroll = () => {
        mapRef.current?.scrollIntoView({ behavior: "smooth" });
      };
  return (
      <div className="min-h-screen bg-[url('/houmenu.png')] py-10 bg-cover">
              <section className="relative h-screen flex items-center justify-center">


                <div className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white/20 text-center">
                  <h1 className="text-4xl mb-4 text-white font-rubik-80s">
                    Houston's Map
                  </h1>

                  <p className="text-lg max-w-2xl mx-auto">
                    Explore Houston's Music Scene
                  </p>

                  <button
                    onClick={scroll}
                    className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
                  >
                    Go
                  </button>
                </div>
              </section>


      <div className="content">
          <section ref={mapRef} className="max-w-6xl mx-auto p-4">
        <HoustonMap />
      </div>
    </div>
  );
};

export default MapPage;
