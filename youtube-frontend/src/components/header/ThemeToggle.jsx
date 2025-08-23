import { useEffect, useState } from "react";

// Simple theme toggle button for Tailwind dark mode
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    // On mount, set theme from localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setIsDark(true);
    if (theme === "light") setIsDark(false);
  }, []);

  return (
    <button
      className="btn btn-sm ml-2"
      onClick={() => setIsDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
