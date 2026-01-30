import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function VolunteerHub() {
    const v = useRef(null);
    const scroll = () => {
        v.current?.scrollIntoView({ behavior: "smooth" });
    };
  const [nonprofits, setNonprofits] = useState([]);

  useEffect(() => {
    const fetchNonprofits = async () => {
      const nonprofitCollection = collection(db, "nonprofits");
      const nonprofitSnapshot = await getDocs(nonprofitCollection);
      const nonprofitList = nonprofitSnapshot.docs.map(doc => doc.data());
      setNonprofits(nonprofitList);
    };

    fetchNonprofits();
  }, []);

  // Additional Nonprofits to add
  const additionalNonprofits = [
    {
      name: "Prelude Music Foundation",
      description: "The Prelude Music Foundation provides early childhood music education to children in underserved communities.",
      website: "https://www.preludemusicfoundation.org",
      volunteerOpportunities: [
        {
          title: "Early Childhood Music Teacher",
          description: "Help teach music fundamentals to children in underserved areas.",
          requirements: "Passion for teaching and experience with early childhood education.",
          timeCommitment: "Flexible, typically 1-3 hours per week",
          applyLink: "https://www.preludemusicfoundation.org/get-involved"
        }
      ]
    },
    {
      name: "Community Music Center of Houston",
      description: "The Community Music Center of Houston works to preserve and celebrate Black musical traditions while providing access to music education for all.",
      website: "https://www.communitymusiccenterhouston.org",
      volunteerOpportunities: [
        {
          title: "Music Instructor",
          description: "Teach music lessons focused on preserving Black musical traditions.",
          requirements: "Experience with music instruction and knowledge of Black musical traditions.",
          timeCommitment: "1-2 hours per week",
          applyLink: "https://www.communitymusiccenterhouston.org/volunteer"
        }
      ]
    },
    {
      name: "Foundation for Modern Music",
      description: "The Foundation for Modern Music supports the creation and performance of new compositions.",
      website: "https://www.foundationformodernmusic.org",
      volunteerOpportunities: [
        {
          title: "Event Organizer",
          description: "Help organize concerts and events that showcase new compositions.",
          requirements: "Experience in event planning or an interest in modern music.",
          timeCommitment: "Variable, depending on upcoming events",
          applyLink: "https://www.foundationformodernmusic.org/get-involved"
        }
      ]
    },
    {
      name: "Houston Music Foundation",
      description: "The Houston Music Foundation provides crisis relief for musicians in need.",
      website: "https://www.houstonmusicfoundation.org",
      volunteerOpportunities: [
        {
          title: "Crisis Relief Volunteer",
          description: "Assist musicians in need during times of crisis with grants and resources.",
          requirements: "Compassion for helping others and experience in crisis relief.",
          timeCommitment: "Flexible, project-based",
          applyLink: "https://www.houstonmusicfoundation.org/volunteer"
        }
      ]
    },
    {
      name: "Musicians Benevolent Society of Houston",
      description: "The Musicians Benevolent Society of Houston provides financial assistance to musicians facing emergencies.",
      website: "https://www.musiciansbenevolentsociety.org",
      volunteerOpportunities: [
        {
          title: "Fundraiser Organizer",
          description: "Help organize fundraising events to support musicians in need.",
          requirements: "Event planning skills and passion for supporting musicians.",
          timeCommitment: "Varies, based on fundraising events",
          applyLink: "https://www.musiciansbenevolentsociety.org/get-involved"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[url('/houmenu.png')] py-10 bg-cover">
        <section className="relative h-screen flex items-center justify-center">
            <div className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white/20 text-center">
                <h1 className="text-4xl mb-4 text-white font-rubik-80s">Concerts Near You</h1>
                <p className="text-lg max-w-2xl mx-auto">Find other ways to embrace the music</p>
                <button onClick={scroll} className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg">See Concerts</button>
            </div>
        </section>
    <div className="content flex justify-center px-4">
      <section ref={v} className="max-w-screen-xl w-full bg-white bg-opacity-60 backdrop-blur-lg p-8 rounded-xl shadow-lg object-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {nonprofits.concat(additionalNonprofits).map((nonprofit, index) => (
            <div key={index} className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg p-6 shadow-xl hover:shadow-2xl transform transition-all hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{nonprofit.name}</h2>
              <p className="text-gray-600 mb-4">{nonprofit.description}</p>
              <a href={nonprofit.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Learn More</a>
              <div className="mt-6">
                {nonprofit.volunteerOpportunities.map((opportunity, idx) => (
                  <div key={idx} className="bg-white bg-opacity-80 backdrop-blur-sm rounded-md p-4 mt-4 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800">{opportunity.title}</h3>
                    <p className="text-gray-600">{opportunity.description}</p>
                    <p className="text-gray-700 font-medium mt-2"><strong>Requirements:</strong> {opportunity.requirements}</p>
                    <p className="text-gray-700 font-medium mt-2"><strong>Time Commitment:</strong> {opportunity.timeCommitment}</p>
                    <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700 mt-4 inline-block">Apply Now</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}

export default VolunteerHub;


