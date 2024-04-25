import { useContext } from "react";
import "./App.scss";
import Home from "./pages/Home";
import { ThemeContext } from "./contexts/ThemeContext";
import Dropdown from "./components/Dropdown";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`main-${theme}`}>
      <Dropdown />
      <p>couleur du theme: {theme}</p>
      <Home />
    </div>
  );
}

export default App;
