import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-blue-400">

      {/* CENTER GLOW BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(234, 239, 245, 0.85), transparent 80%)",
        }}
      />

      {/* APP CONTENT */}
      <div className="relative z-10 flex flex-col w-full">

        {/* TOP NAV */}
        <header className="bg-white/90 backdrop-blur border-b border-blue-100 px-10 py-4 flex gap-8">
          <Link to="/dashboard" className="font-semibold text-blue-500">
            Dashboard
          </Link>
          <Link to="/" className="font-semibold">
            Log
            </Link>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
