import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "./SearchBar";

const SearchModal = ({ setShowSearchBar }) => {
  return (
    <div className="fixed w-full left-0 top-0 h-14 z-60 absolute flex items-center justify-center bg-white">
      <div className=" w-full h-14 flex items-center gap-4 justify-between px-3 bg-base-300">
        {/* Close button */}
        <button
          className="btn btn-ghost"
          onClick={() => setShowSearchBar(false)}
        >
          <FaArrowLeft size={20} />
        </button>
        {/* Search bar */}
        <SearchBar autoFocusOnMount forceShow className="flex justify-center w-full relative"  />
      </div>
    </div>
  );
};

export default SearchModal;