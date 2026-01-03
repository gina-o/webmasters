import CDCanvas from "./CDCanvas";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-gray-700 overflow-hidden">
      {/* 3D CD */}
      <CDCanvas />
      {/* will change */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl pointer-events-none">
        Click the CD to enter Houston vibes
      </div>
    </div>
  );
}
