import { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

const SearchBar = ({ className = "", autoFocusOnMount = false, ...props }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // track if screen is desktop
  const inputRef = useRef(null);

  const searchHistory = ["React", "Next.js", "Tailwind"];
  const searchList = ["React Tutorial", "Next.js Guide", "Tailwind Tips"];
  const error = <li className="p-2">No results found</li>;
    
  useEffect(() => {
    // check on mount + listen to resize
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (autoFocusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocusOnMount]);

  const handleSeachQuerySubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", inputValue);
    setIsFocused(false);
    if (!isDesktop) setIsMobileOpen(false); // close on mobile after submit
  };

  const handleClearInput = (e) => {
    e.preventDefault();
    setInputValue("");
    inputRef.current.focus();
  };

  const handleFocus = () => setIsFocused(true);
  const handleSubmitFromSearchList = (query) => {
    console.log("Search selected:", query);
    setInputValue(query);
    setIsFocused(false);
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className={`${className} relative`}>
      {/* Mobile search icon */}
      {/* {!isDesktop && (
        <button
          type="button"
          onClick={handleMobileToggle}
          className="sm:hidden p-2 rounded-full hover:bg-gray-700"
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
      )} */}

      {/* Search field */}
      {( isDesktop) && (
        <form
          onSubmit={handleSeachQuerySubmit}
          className="
          flex 
          border-1 border-base-content/20 
          rounded-full w-full sm:w-sm md:w-md lg:w-lg xl:w-xl
          overflow-hidden 
          bg-base-200/40 relative
          absolute sm:static top-12 sm:top-0 left-0 z-[52] sm:z-auto
          p-0
          "
        >
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            className="border-none outline-none py-2 px-4 w-full bg-transparent"
            type="text"
            autoFocus
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
          {inputValue !== "" && (
            <button
              onClick={handleClearInput}
              className="absolute right-16 top-1 hover:bg-gray-700 p-1 rounded-full cursor-pointer"
            >
              <RxCross1 size={24} />
            </button>
          )}
        </form>
      )}

      {/* Search result list */}
      {isFocused && (isMobileOpen || isDesktop) && (
        <ul
          className="p-0
          menu bg-base-200 
          rounded-box w-full 
          sm:w-sm md:w-md 
          lg:w-lg 
          absolute 
          top-24 sm:top-12
          left-0 z-[51] overflow-hidden"
        >
          {!inputValue
            ? searchHistory.length > 0
              ? searchHistory.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => handleSubmitFromSearchList(item)}
                    className="p-2 cursor-pointer hover:bg-gray-600"
                  >
                    {item}
                  </li>
                ))
              : null
            : searchList && searchList.length > 0
            ? searchList.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleSubmitFromSearchList(item)}
                  className="p-2 cursor-pointer hover:bg-gray-600"
                >
                  {item}
                </li>
              ))
            : error}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
