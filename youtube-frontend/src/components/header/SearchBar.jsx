import { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

/**
 * SearchBar component for both desktop and mobile/modal usage.
 * - Shows a search input and submit button.
 * - On desktop, input is shown inline; on mobile/modal, input is shown in modal.
 * - Prints search query to console on submit.
 *
 * Props:
 *   - className: string, extra classes for the wrapper
 *   - autoFocusOnMount: boolean, auto-focus input on mount
 *   - forceShow: boolean, always show input (for modal)
 */
const SearchBar = ({ className = "", autoFocusOnMount = false, forceShow = false, ...props }) => {
  // State for the input value
  const [inputValue, setInputValue] = useState("");
  // State for input focus
  const [isFocused, setIsFocused] = useState(false);
  // Track if screen is desktop (>=640px)
  const [isDesktop, setIsDesktop] = useState(false);
  // Ref for the input element
  const inputRef = useRef(null);

  // Effect: update isDesktop on mount and window resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect: auto-focus input if requested
  useEffect(() => {
    if (autoFocusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocusOnMount]);

  /**
   * Handles search form submit. Prints query to console.
   */
  const handleSeachQuerySubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", inputValue);
    setIsFocused(false);
  };

  /**
   * Clears the input value and refocuses the input.
   */
  const handleClearInput = (e) => {
    e.preventDefault();
    setInputValue("");
    inputRef.current.focus();
  };

  /**
   * Sets input as focused (shows suggestions).
   */
  const handleFocus = () => setIsFocused(true);

  /**
   * Handles clicking a suggestion from the list.
   */
  const handleSubmitFromSearchList = (query) => {
    console.log("Search selected:", query);
    setInputValue(query);
    setIsFocused(false);
  };

  return (
    <div className={`${className} relative`}>
      {/* Search field (form) - visible on desktop or when forceShow (modal) is true */}
      {(isDesktop || forceShow) && (
        <form
          onSubmit={handleSeachQuerySubmit}
          className={`
            flex 
            border-1 border-base-content/20 
            rounded-full w-full sm:w-sm md:w-md lg:w-lg xl:w-xl
            overflow-hidden 
            bg-base-200/40 relative
            ${!forceShow ? 'absolute sm:static top-12 sm:top-0 left-0 z-[52] sm:z-auto' : ''}
            p-0
          `}
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
    </div>
  );
};

export default SearchBar;
