import { useState } from "react";
import { Menu, X } from "lucide-react";
import { aboutMeInfo } from "../constants/info";
const NavItems = ({ sectionsName, setActiveSection }) => {
  return (
    <ul className="nav-ul">
      {sectionsName.map((name) => (
        <li
          key={name}
          className="nav-li"
          onClick={() => {
            setActiveSection([name, 0]);
          }}
        >
          <button className="nav-li_a">{name}</button>
        </li>
      ))}
    </ul>
  );
};

const Navbar = ({ sectionsName, setActiveSection, setLightMode }) => {
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!isOpen);
  const closeMenu = () => setOpen(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-95 shadow-lg ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <button
            className="text-neutral-400 font-bold text-3xl hover:text-purple-400 transition-colors"
            onClick={() => setLightMode((prev) => !prev)}
          >
            {aboutMeInfo.firstName}
          </button>
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          <nav className="sm:flex hidden">
            <NavItems sectionsName={sectionsName} setActiveSection={setActiveSection} />
          </nav>
        </div>
      </div>
      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} sectionsName={sectionsName} setActiveSection={setActiveSection} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
