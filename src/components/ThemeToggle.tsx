import MoonIcon from "../icons/MoonIcon";
import DotIcon from "../icons/DotIcon";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <DotIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
