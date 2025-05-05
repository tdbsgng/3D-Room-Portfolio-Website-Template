import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import Finder from "./components/Finder.jsx";

const App = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [activeSection, setActiveSection] = useState("");
  const [lightMode, setLightMode] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white mx-auto relative">
      <Navbar
        sectionsName={["About Me", "Education", "Projects", "Experience"]}
        setActiveSection={setActiveSection}
        setLightMode={setLightMode}
      />
      <Hero isMobile={isMobile} setActiveSection={setActiveSection} lightMode={lightMode} />
      <Finder isMobile={isMobile} activeSection={activeSection} setActiveSection={setActiveSection} />
    </main>
  );
};

export default App;
