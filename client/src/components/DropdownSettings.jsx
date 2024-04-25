import "./DropdownSettings.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function DropdownSettings() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="dropdown">
        <i className="fi fi-rr-settings-sliders"></i>
        <div className="dropdown-content">
          <button type="button" className="color-selector" onClick={(e) => changeTheme("dark")}>
            Dark
          </button>
          <button type="button" className="color-selector" onClick={(e) => changeTheme("light")}>
            Light
          </button>
          <button type="button" className="color-selector" onClick={(e) => changeTheme("candy")}>
            Candy
          </button>
        </div>
      </div>
    </>
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
