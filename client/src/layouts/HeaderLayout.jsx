import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Header from "../components/Header";

function HeaderLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`themed-main ${theme}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default HeaderLayout;
