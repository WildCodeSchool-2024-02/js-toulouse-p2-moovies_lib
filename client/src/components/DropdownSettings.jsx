import "./Dropdown.scss";
import paramIcon from "../assets/images/settings-colors-icon.svg";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Dropdown() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <>
      <select onChange={(e) => changeTheme(e.target.value)} defaultValue={theme}>
        <option value="dark">dark </option>
        <option value="light">light</option>
      </select>
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

export default Dropdown;
