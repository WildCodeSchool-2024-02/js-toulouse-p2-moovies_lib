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
// Dropdown.propTypes = {
//   person: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     job: PropTypes.string,
//     character: PropTypes.string,
//     profile_path: PropTypes.string,
//   }).isRequired,
// };

export default DropdownSettings;
