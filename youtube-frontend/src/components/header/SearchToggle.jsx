const SearchToggle = ({ setShowSearchBar }) => {
  return (
    <button
    // Show search toggle button on mobile only
      onClick={() => setShowSearchBar(true)}
      className="btn btn-circle ml-4 sm:hidden"
    >
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
          fillRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default SearchToggle;