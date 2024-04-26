import logo from "../assets/images/logo.jpg";
import DropdownSettings from "./DropdownSettings";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="" />
      <h1>Moovies Lib</h1>
      <DropdownSettings />
    </header>
  );
}

export default Header;
