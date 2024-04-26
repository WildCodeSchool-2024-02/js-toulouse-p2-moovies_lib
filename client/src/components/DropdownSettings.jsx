import "./DropdownSettings.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function DropdownSettings() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className="dropdown">
      <i className="fi fi-rr-settings-sliders" />
      <div className={`dropdown-content themed-dropdown ${theme}`}>
        <button type="button" className="color-selector" onClick={() => changeTheme("dark")}>
          Dark
        </button>
        <button type="button" className="color-selector" onClick={() => changeTheme("light")}>
          Light
        </button>
        <button type="button" className="color-selector" onClick={() => changeTheme("candy")}>
          Candy
        </button>
      </div>
    </div>
  );
}

export default DropdownSettings;
