'use client';

import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaInbox, FaPaperPlane, FaStar, FaCpanel, FaUserFriends, FaUser, FaFileAlt, FaRegCalendarAlt, FaChalkboard } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{
    [section: string]: boolean;
  }>({
    favorites: true,
    channels: true,
    others: true,
  });

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Close sidebar when clicking outside the sidebar
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden h-fit p-2 z-20 border-x-2 shadow-2xl relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
          className="text-gray-800"
        >
          {isOpen ? <FaTimes className="h-8 w-8" /> : <FaBars className="h-8 w-8" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-20 h-full  bg-white shadow-xl p-2 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
        ref={sidebarRef}
      >
        <div className="flex flex-col max-h-full">
          {/* Logo / Title and Close Button */}
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg font-bold text-gray-800">Conceptzilla</div>
          </div>

          {/* Sections */}
          <nav className="overflow-y-auto max-h-full flex-grow">
            <ul className='px-4'>
              <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                <FaFileAlt className="inline mr-2" /> Drafts
              </li>
              <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                <FaPaperPlane className="inline mr-2" /> Saved items
              </li>
              <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex items-center">
                    <FaInbox className="inline mt-1 mr-2" />
                    Inbox
                  </div>
                  <span className="text-gray-500">8</span>
                </div>
              </li>
              <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex items-center">
                    <FaUser className="inline mt-1 mr-2" />
                    Direct Message
                  </div>
                  <span className="text-gray-500">4</span>
                </div>
              </li>
            </ul>

            {/* Favorites Section */}
            <div className="mt-3">
              <h3
                className="font-semibold text-gray-800 cursor-pointer flex items-center"
                onClick={() => toggleSection('favorites')}
              >
                <FaStar className="mr-2 text-gray-700" /> Favorites
              </h3>
              {expandedSections.favorites && (
                <ul className="mt-1 px-4">
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaUserFriends className="inline mt-1 w-4 h-4 mr-2" />
                        Sofia Willson
                      </div>
                      <span className="text-gray-500">1</span>
                    </div>
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaChalkboard className="inline mt-1 mr-2" />
                        Front-end
                      </div>
                      <span className="text-gray-500">2</span>
                    </div>
                  </li>
                </ul>
              )}
            </div>

            {/* Channels Section */}
            <div className="mt-3">
              <h3
                className="font-semibold text-gray-800 cursor-pointer flex items-center"
                onClick={() => toggleSection('channels')}
              >
                <FaCpanel className="mr-2" /> Channels
              </h3>
              {expandedSections.channels && (
                <ul className="mt-1 px-4">
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaChalkboard className="inline mt-1 mr-2" />
                        General
                      </div>
                      <span className="text-gray-500">4</span>
                    </div>
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaChalkboard className="inline mt-1 mr-2" />
                        Front-end
                      </div>
                      <span className="text-gray-500">8</span>
                    </div>
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    <FaCpanel className="inline mr-2" /> Website
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    <FaCpanel className="inline mr-2" /> v3.0
                    <ul className="ml-4 space-y-1 mt-2">
                      <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                        Wireframe
                      </li>
                      <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                        Design
                      </li>
                      <li className="text-sm font-medium text-gray-500 bg-gray-100 p-1 rounded-md">
                        UI-kit design
                      </li>
                    </ul>
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    v2.0 - actual version
                  </li>
                </ul>
              )}
            </div>

            {/* Others Section */}
            <div className="mt-3">
              <h3
                className="font-semibold text-gray-800 cursor-pointer flex items-center"
                onClick={() => toggleSection('others')}
              >
                <FaRegCalendarAlt className="mr-2" /> Others
              </h3>
              {expandedSections.others && (
                <ul className="mt-1 px-4">
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    Strategy
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    Events
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    Announcements
                  </li>
                  <li className="text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-colors">
                    Tasks
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
