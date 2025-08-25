import { memo, useState, useEffect } from "react";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";
import { useRef } from "react";
import SearchToggle from "./SearchToggle";
import SearchModal from "./SearchModal";
import Sidebar from "../sidebar/Sidebar";

const Navbar = memo(() => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const profileModalRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close search modal automatically when screen becomes desktop size
  useEffect(() => {
    if (windowWidth > 640) {
      setShowSearchBar(false);
    }
  }, [windowWidth]);

  return (
    <>
      <header
        className="
          fixed top-0 left-0 right-0 
          flex items-center justify-between 
          px-4 py-2 
          z-50 bg-white
        "
      >
        {/* Left: Burger menu + Logo */}
        <div className="flex items-center space-x-2">
          <BurgerMenu onClick={() => setShowSidebar(true)} />
          <Logo />
        </div>

        {/* Middle: Search */}
        <div className="flex items-center">
          {/* Desktop: show SearchBar */}
          <div className="hidden sm:flex justify-center w-full">
            <SearchBar />
          </div>
          {/* Mobile: show SearchToggle */}
          <div className="sm:hidden">
            <SearchToggle setShowSearchBar={setShowSearchBar} />
          </div>
        </div>

        {/* Right: Profile Button */}
        <nav className="flex items-center space-x-2">
          <ProfileButton onClick={() => setShowProfileModal(true)} />
        </nav>
        {/* Profile Modal */}
        {showProfileModal && (
          <div ref={profileModalRef} className="absolute right-4 top-14 z-50">
            <div className="bg-white dark:bg-gray-100 rounded-lg shadow-lg p-4 min-w-[200px] flex flex-col items-center border border-gray-100 dark:border-gray-700">
              <div className="mb-2 font-semibold text-base">Profile</div>
              <button
                className="btn btn-error w-full mb-2"
                onClick={() => {
                  localStorage.clear();
                  setShowProfileModal(false);
                  window.location.reload();
                }}
              >
                Sign Out
              </button>
              <button
                className="btn btn-ghost w-full"
                onClick={() => setShowProfileModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Search Modal for mobile */}
      {showSearchBar && (
        <SearchModal setShowSearchBar={setShowSearchBar} />
      )}
       {/* Sidebar */}
      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

    </>
  );
});

export default Navbar;
