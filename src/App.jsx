// App.jsx

import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import TimelinePage from "./pages/TimelinePage.jsx";
import Social from "./pages/Social.jsx";
import Map from "./pages/Map.jsx";
import ConcertUpdates from "./pages/ConcertUpdates.jsx";
import Resilience from "./pages/Resilience.jsx";
import ResourceForm from './pages/ResourceForm.jsx';
import Volunteer from './pages/Volunteer.jsx';
import ReferencePage from './pages/ReferencePage.jsx';

export default function App() {
  return (
    <div>
      <Link 
        to="/menu" 
        className="fixed bottom-10 right-10 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition z-50"
      >
        <FaMusic size={30} />
      </Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/timelinePage" element={<TimelinePage />} />
        <Route path="/social" element={<Social />} />
        <Route path="/map" element={<Map />} />
        <Route path="/concert-updates" element={<ConcertUpdates />} />
        <Route path="/resilience" element={<Resilience />} />
        <Route path="/resource-form" element={<ResourceForm />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/reference-page" element={<ReferencePage />} />
      </Routes>
    </div>
  );
}
