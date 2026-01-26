import HoustonMap from "../components/HoustonMap";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="font-sixtyfour animate-neon-pulse text-4xl mb-4 text-white font-['Workbench'] text-center">
        Explore Houston's Music Scene
      </h1>
      <div className="max-w-6xl mx-auto p-4">
        <HoustonMap />
      </div>
    </div>
  );
};

export default MapPage;
