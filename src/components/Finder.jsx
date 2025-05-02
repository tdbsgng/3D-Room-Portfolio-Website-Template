import React, { useState, useEffect, useRef } from "react";
import { FolderIcon, X, Minus } from "lucide-react";

const Finder = (props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const windowRef = useRef(null);
  const navigationItems = ["About Me", "Education", "Projects", "Experience"];
  
  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.scrollTo(0, 0);
    }
  }, [props.activeSection]);
  
  // ESC key event listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        props.setActiveSection(["", 0]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Custom fullscreen icon component
  const FullscreenIcon = ({ isFullscreen = true }) => (
    <svg width={10} height={10} viewBox="0 0 10 10" className="text-green-900 absolute">
      {isFullscreen ? (
        <path d="M5,5 L1,5 L5,1 Z" fill="currentColor" />
      ) : (
        <path d="M2,2 L2,6 L6,2 Z" fill="currentColor" />
      )}
      {isFullscreen ? (
        <path d="M5,5 L9,5 L5,9 Z" fill="currentColor" />
      ) : (
        <path d="M8,8 L4,8 L8,4 Z" fill="currentColor" />
      )}
    </svg>
  );

  const SidebarItem = ({ sectionName }) => {
    const isActive = props.activeSection[0] === sectionName;

    return (
      <button
        className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors duration-200 ${
          isActive ? "bg-gray-700" : "hover:bg-gray-700/50"
        }`}
        onClick={() => props.setActiveSection([sectionName, 0])}
      >
        <FolderIcon size={16} className="text-blue-500" />
        <span className="font-semibold text-base">{sectionName}</span>
      </button>
    );
  };

  const BookmarkItem = ({ sectionName }) => {
    const isActive = props.activeSection[0] === sectionName;

    return (
      <button
        className={`flex items-center justify-center space-x-1 px-1 py-2 rounded-t-lg transition-colors duration-200 w-full overflow-hidden ${
          isActive ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700/70 hover:text-white"
        }`}
        onClick={() => props.setActiveSection([sectionName, 0])}
      >
        <FolderIcon size={14} className="text-blue-500 flex-shrink-0" />
        <span className={`font-medium ${props.isMobile ? "text-xs" : "text-sm"} truncate`}>{sectionName}</span>
      </button>
    );
  };

  const shouldShowBookmarks = isFullscreen || props.isMobile;
  const shouldShowSidebar = !isFullscreen && !props.isMobile;

  return (
    props.activeSection[0] !== "" && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            props.setActiveSection(["", 0]);
          }
        }}
      >
        {/* Floating window container - adjusts based on fullscreen state */}
        <div
          className={`${isFullscreen ? "w-full h-full" : "w-[95%] h-[95%]"} flex flex-col bg-gray-900 text-white rounded-lg overflow-hidden border border-gray-700 shadow-2xl`}
        >
          {/* Title bar */}
          <div className="bg-gray-800 p-3 flex items-center relative">
            {/* Control buttons - Positioned absolutely to not affect title centering */}
            <div className="absolute left-3 flex space-x-2 z-10">
              {/* Red button (close) */}
              <div
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-80 relative flex items-center justify-center"
                onClick={() => {
                  props.setActiveSection(["", 0]);
                  setShowClose(false);
                  setIsFullscreen(!isFullscreen);
                }}
                title="Close window"
                onMouseEnter={() => setShowClose(true)}
                onMouseLeave={() => setShowClose(false)}
              >
                {showClose && <X size={10} className="text-red-900 absolute" />}
              </div>

              {/* Yellow button (minimize) */}
              <div
                className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:opacity-80 relative flex items-center justify-center"
                onClick={() => {
                  props.setActiveSection(["", 0]);
                  setShowHide(false);
                }}
                title="Minimize window"
                onMouseEnter={() => setShowHide(true)}
                onMouseLeave={() => setShowHide(false)}
              >
                {showHide && <Minus size={10} className="text-yellow-900 absolute" />}
              </div>

              {/* Green button (fullscreen toggle) with custom icon */}
              <div
                className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:opacity-80 relative flex items-center justify-center"
                onClick={() => {
                  setIsFullscreen(!isFullscreen);
                  setShowFullScreen(false);
                }}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                onMouseEnter={() => setShowFullScreen(true)}
                onMouseLeave={() => setShowFullScreen(false)}
              >
                {showFullScreen && <FullscreenIcon isFullscreen={isFullscreen} />}
              </div>
            </div>

            {/* Title - Centered regardless of other elements */}
            <div className="w-full text-center font-semibold">{props.activeSection[0]}</div>
          </div>
          {/* bookmarks */}
          {shouldShowBookmarks && (
            <div className="bg-gray-800 border-b border-gray-700 px-1 pt-2 flex overflow-hidden">
              {navigationItems.map((item, index) => (
                <div key={index} className="flex-1 min-w-0">
                  <BookmarkItem sectionName={item} />
                </div>
              ))}
            </div>
          )}

          {/* Main content */}
          <div className="flex flex-1 overflow-hidden h-full">
            {/* Sidebar - Only show if not mobile and not fullscreen */}
            {shouldShowSidebar && (
              <div className="w-48 bg-gray-800 p-4 text-gray-300 overflow-y-auto">
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-3">Favorites</p>
                  <div className="space-y-3">
                    {navigationItems.map((item, index) => (
                      <SidebarItem key={index} sectionName={item} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content area */}
            <div className="flex-1 bg-gray-900 overflow-y-auto overflow-x-hidden h-full py-10" ref={windowRef}>
              {props.sectionsContent[props.activeSection[0]]}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Finder;