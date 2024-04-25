import { useContext } from "react";
import "./App.scss";
import Home from "./pages/Home";

import { ThemeContext } from "./contexts/ThemeContext";
import Header from "./components/Header";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`main-${theme}`}>
      <Header />

      <Home />
    </div>
  );
}

export default App;
