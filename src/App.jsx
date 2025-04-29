import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import AboutMe from "./sections/AboutMe.jsx";
import Education from "./sections/Education.jsx";
import Projects from "./sections/Projects.jsx";
import Experience from "./sections/Experience.jsx";
import Finder from "./components/Finder.jsx";
const App = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [activeSection, setActiveSection] = useState("");

  const sectionsContent = {
    "About Me": <AboutMe />,
    Education: <Education />,
    Projects: <Projects />,
    Experience: <Experience />,
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white mx-auto relative">
      <Navbar sectionsName={Object.keys(sectionsContent)} setActiveSection={setActiveSection} />
      <Hero isMobile={isMobile} setActiveSection={setActiveSection} />
      <Finder
        isMobile={isMobile}
        sectionsContent={sectionsContent}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </main>
  );
};

export default App;
