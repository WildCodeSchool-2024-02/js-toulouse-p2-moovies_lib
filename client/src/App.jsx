import { useContext } from "react";
import "./App.css";
import Home from "./pages/Home";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <>
      <button onClick={toggleTheme} type="button">
        changer de theme
      </button>
      <p>couleur du theme: {theme}</p>
      <Home />
    </>
  );
}

export default App;
