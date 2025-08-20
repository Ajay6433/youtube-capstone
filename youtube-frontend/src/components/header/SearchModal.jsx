import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

const SearchModal = ({ setShowSearchBar }) => {
  return (
    <div className="fixed w-full left-0 top-0 h-14 z-60 bg-white">
      <div className=" w-full h-14 flex items-center gap-4 justify-between px-3 bg-base-300">
        <button
          className="btn btn-ghost"
          onClick={() => setShowSearchBar(false)}
        >
          <FaArrowLeft size={20} />
        </button>
        <SearchBar autoFocusOnMount className="flex justify-center w-full relative"  />
      </div>
    </div>
  );
};

export default SearchModal;