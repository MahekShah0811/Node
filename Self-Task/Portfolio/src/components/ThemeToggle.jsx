import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // This effect runs every time darkMode changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
    >
      {darkMode ? (
        <Sun size={20} fill="currentColor" />
      ) : (
        <Moon size={20} fill="currentColor" />
      )}
    </button>
  );
};

export default ThemeToggle;