import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const exploreRef = useRef(null); // HOW TO EXPLORE
  const navigate = useNavigate();   // React Router navigation

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const goToTimeline = () => {
    navigate("/timeline"); // <-- Replace with your timeline page route
  };

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto text-white">
      {/* 🌊 Background */}
      <div className="fixed inset-0 bg-[url('/houmenu.png')] bg-cover" />

      {/* 🔮 Glass bubbles */}
      <div className="fixed top-16 left-10 w-72 h-72 bg-cyan-300/10 rounded-3xl blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-24 right-12 w-96 h-96 bg-blue-400/10 rounded-3xl blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-3xl blur-3xl pointer-events-none z-0" />

      {/* scroll */}
      <section className="relative h-screen">
          <div className="fixed inset-0 bg-[url('/houmenu.png')] bg-cover bg-center" />

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-5xl w-full bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white/20 text-center">
              <h1 className="font-sixtyfour animate-neon-pulse text-4xl mb-4 text-white font-['Workbench']">Welcome to the Sounds of Houston</h1>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                          This is a living, musical map of our city. Where history, culture,
                          and community come together through sound.
                        </p>

               <button
                           onClick={scrollToExplore}
                           className="mt-8 bg-purple-600 hover:bg-purple-800 text-white py-3 px-8 rounded-xl transition duration-200 shadow-lg"
                         >
                           Begin Your Journey →
                         </button>
            </div>
          </div>
        </section>
      <div className="relative z-10 flex flex-col items-center py-40 px-6 lg:px-32 space-y-40">
        {/* 🌟 HERO */}
    <div class="content">
        {/* 🌀 HOW TO EXPLORE */}
        <section ref={exploreRef} className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
            <h2 className="text-3xl font-bold mb-4">Explore Neighborhoods</h2>
            <p>Click through Houston’s communities...</p>
            <button
  onClick={() => navigate("/map")}
  className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition duration-200 shadow-md"
>
  Check out map
</button>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
            <h2 className="text-3xl font-bold mb-4">See what others are talking about</h2>
            <p>Experience the sounds of Houston together</p>
                <button
  onClick={() => navigate("/social")}
  className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition duration-200 shadow-md"
>
  Go to Blog 
</button>
          </div>

          {/* Card 3 - See the Pulse */}
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">See the Pulse</h2>
            <p>
              Watch the waveform timeline to see how historical moments and music move
              together across decades.
            </p>

            {/* Button to navigate to timeline page */}
            
    <button
  onClick={() => navigate("/timelinePage")}
  className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition duration-200 shadow-md"
>
  Watch the Waveform Timeline →
</button>


          </div>

          {/* Card 4 */}
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
            <h2 className="text-3xl font-bold mb-4">Check out the venues</h2>
            <p>Explore the music, which shapes Houston.</p>
                <button
  onClick={() => navigate("/concert-updates")}
  className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition duration-200 shadow-md"
>
  Watch the Waveform Timeline →
</button>
          </div>
        </section>
      </div>
    </div>
  );
}
