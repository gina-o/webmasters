import HoustonMap from "../components/HoustonMap";

const MapPage = () => {
    const mapRef = useRef(null);

    const scroll = () => {
        mapRef.current?.scrollIntoView({ behavior: "smooth" });
      };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="font-rubik-80s animate-neon-pulse text-4xl mb-4 text-white text-center">
        Explore Houston's Music Scene
      </h1>
      <div className="max-w-6xl mx-auto p-4">
        <HoustonMap />
      </div>
    </div>
  );
};

export default MapPage;
