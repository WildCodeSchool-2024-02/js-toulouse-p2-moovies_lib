import logo from "../assets/images/logo.jpg";

function header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="" />
      <h1>Moovies Lib</h1>
    </header>
  );
}

export default header;
