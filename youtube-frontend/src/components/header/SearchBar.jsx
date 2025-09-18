import { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useVideos } from "../../context/VideoContext";

const SearchBar = ({ className = "", autoFocusOnMount = false, forceShow = false, ...props }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { videos, setFilteredVideos } = useVideos();
  const inputRef = useRef(null);

  const handleSeachQuerySubmit = (e) => {
    e.preventDefault();

    const query = inputValue.toLowerCase();
    const results = videos.filter((video) =>
      video.title.toLowerCase().includes(query)
    );

    setFilteredVideos(results); // ✅ update context state
    setInputValue("");
    setIsFocused(false);
  };

  const handleClearInput = (e) => {
    e.preventDefault();
    setInputValue("");
    inputRef.current.focus();
    setFilteredVideos(videos); // ✅ reset back to all videos
  };

 return (
  <div className={`${className} relative`}>
    {/* Responsive search bar */}
    {(window.innerWidth >= 640 || forceShow) && (
      <form
        onSubmit={handleSeachQuerySubmit}
        className={`
          flex
          border-1 border-base-content/20
          rounded-full
          w-full sm:w-sm md:w-md lg:w-lg xl:w-xl
          mx-auto
          overflow-hidden
          bg-base-200/40 relative
          ${!forceShow ? "absolute sm:static top-12 sm:top-0 left-0 z-[52] sm:z-auto" : ""}
          p-0
        `}
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="border-none outline-none py-2 px-4 w-full bg-transparent"
          type="text"
          placeholder="Search"
          {...props}
        />
        <button
          type="submit"
          className="py-2 pr-4 pl-6 bg-base-100 border-l-1 border-l-base-content/20 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
            />
          </svg>
        </button>
        {/* Clear input button */}
        {inputValue && (
          <button
            onClick={handleClearInput}
            className="absolute right-16 top-1 hover:bg-gray-700 p-1 rounded-full cursor-pointer"
          >
            <RxCross1 size={24} />
          </button>
        )}
      </form>
    )}
  </div>
);

};

export default SearchBar;
