import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const exploreRef = useRef(null); // HOW TO EXPLORE
  const navigate = useNavigate();   // React Router navigation

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const goToTimeline = () => {
    navigate("/timeline");
  };

  return (
    <div className="relative w-full text-white overflow-x-hidden">
      {/* background */}
      <div className="fixed inset-0 bg-[url('/houmenu.png')] bg-cover" />

      {/* bubbles */}
      <div className="fixed top-16 left-10 w-72 h-72 bg-cyan-300/10 rounded-3xl blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-24 right-12 w-96 h-96 bg-blue-400/10 rounded-3xl blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-3xl blur-3xl pointer-events-none z-0" />

      {/* scroll */}
      <section className="relative h-screen">
          <div className="fixed inset-0 bg-[url('/houmenu.png')] bg-cover bg-center" />

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-5xl w-full bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white/20 text-center">
              <h1 className="font-sixtyfour animate-neon-pulse text-4xl mb-4 text-white font-rubik-80s">Welcome to the Sounds of Houston</h1>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                          This is a living, musical map of our city. Where history, culture,
                          and community come together through sound.
                        </p>

               <button
                           onClick={scrollToExplore}
                           className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg shadow-md"
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
        <section
                ref={exploreRef}
                className="relative min-h-screen content z-20"
              >

                <div className="flex justify-center px-6 lg:px-32 py-40">

                  <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
<<<<<<< HEAD
                    <div className="bg-white/10  backdrop-blur-md p-10 rounded-xl border border-white/20">
                      <h2 className="text-3xl font-rubik-80s mb-4">
=======
                    <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20 flex flex-col items-center">
                      <h2 className="text-3xl font-bold mb-4">
>>>>>>> 2169a2a5109509bcc21343b407c9ce6c3d2084dc
                        Explore Neighborhoods
                      </h2>
                      <p>See the sound that fills the coves.</p>
                      <button
                        onClick={() => navigate("/map")}
                        className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
                      >
                        Check out map
                      </button>
                    </div>

<<<<<<< HEAD
          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
            <h2 className="text-3xl font-rubik-80s mb-4">See what others are talking about</h2>
            <p>Experience the sounds of Houston together.</p>
                <button
  onClick={() => navigate("/resilience")}
  className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition duration-200 shadow-md"
>
  Go to Blog 
</button>
          </div>
=======
                    {/* Card 2 */}
                    <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20 flex flex-col items-center">
                      <h2 className="text-3xl font-bold mb-4 text-center">
                        See what others are talking about
                      </h2>
                      <p className="text-center" >Experience the sounds of Houston together</p>
                      <button
                        onClick={() => navigate("/social")}
                        className="mt-4 bg-cyan-500 hover:bg-cyan-700 py-2 px-4 rounded-lg"
                      >
                        Go to Blog
                      </button>
                    </div>
>>>>>>> 2169a2a5109509bcc21343b407c9ce6c3d2084dc

                    {/* Card 3 */}
                    <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20 flex flex-col items-center">
                      <h2 className="text-3xl font-rubik-80s mb-4">How time flows by</h2>
                      <p className="text-center">
                        Watch the timeline to see how historical moments and
                        music move together across decades.
                      </p>
                      <button
                        onClick={() => navigate("/timelinePage")}
                        className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
                      >
                        Timeline →
                      </button>
                    </div>

                    {/* Card 4 */}
<<<<<<< HEAD
                    <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
                      <h2 className="text-3xl font-rubik-80s mb-4">
=======
                    <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20 flex flex-col items-center">
                      <h2 className="text-3xl font-bold mb-4">
>>>>>>> 2169a2a5109509bcc21343b407c9ce6c3d2084dc
                        Check out the venues
                      </h2>
                      <p>Explore the music which shapes Houston.</p>
                      <button
                        onClick={() => navigate("/concert-updates")}
                        className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
                      >
                        View venues →
                      </button>
                      
                    </div>
                    
                    {/* Card 5 */}
                    <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
                      <h2 className="text-3xl font-rubik-80s mb-4">
                        Get involved
                      </h2>
                      <p>Help shape the future of Houston's music scene.</p>
                      <button
                        onClick={() => navigate("/volunteer")}
                        className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
                      >
                        Volunteer →
                      </button>
                      </div>
                    {/* Card 6 */}
                    <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
                      <h2 className="text-3xl font-rubik-80s mb-4">
                        Any Recommendations?
                      </h2>
                      <p>Let us know!</p>
                      <button
                        onClick={() => navigate("/resource-form")}
                        className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
                      >
                        Fill form →
                      </button>

                      
                    
                      
                    </div>
                  </div>
                </div>
              </section>
        </div>
      </div>
    </div>
  );
}
