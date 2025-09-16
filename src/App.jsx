import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./sections/Home";
import Courses from "./sections/Courses";
import Reviews from "./sections/Reviews";
import Enroll from "./sections/Enroll";
import Notes from "./pages/Notes";
import English from "./components/note/English";
import Mathematics from "./components/note/Mathematics";
import Quran from "./components/note/Islamic-Studies";
import Science from "./components/note/Science";
import Urdu from "./components/note/Urdu";
import Reload from "./components/Reload";
import Glimpse from "./pages/Glimpse";
import Announcements from "./assets/Announcements";

const App = () => {
  return (
    <Reload>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Enroll" element={<Enroll />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Notes/English" element={<English />} />
        <Route path="/Notes/Mathematics" element={<Mathematics />} />
        <Route path="/Notes/Islamic-Studies" element={<Quran />} />
        <Route path="/Notes/Science" element={<Science />} />
        <Route path="/Notes/Urdu" element={<Urdu />} />
        <Route path="/Glimpse" element={<Glimpse />} />
        <Route path="/Announcements" element={<Announcements />} />
      </Routes>
    </Reload>
  );
};

export default App;
