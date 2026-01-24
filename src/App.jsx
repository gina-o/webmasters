import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import TimelinePage from "./pages/TimelinePage.jsx"; // ✅ import the correct component
import Social from "./pages/Social.jsx";
import Map from "./pages/Map.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/timelinePage" element={<TimelinePage />} /> 
      <Route path="/social" element={<Social />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
}

