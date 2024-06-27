import MoonIcon from "../../icons/MoonIcon";
import SunIcon from "@/src/icons/SunIcon";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-blue-gray dark:text-gray-light"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Theme Icon</span>
    </button>
  );
};

export default ThemeToggle;
