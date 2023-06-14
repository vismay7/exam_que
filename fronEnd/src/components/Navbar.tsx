import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setLogged, logged, admin }: any) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {admin === "admin" && (
              <>
                <li className="nav-item">
                  <Link to={"/dashboard"} className="nav-link active" aria-current="page">
                    dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/form"} className="nav-link active" aria-current="page">
                    Form
                  </Link>
                </li>
              </>
            )}
            {admin === "user" && (
              <>
                <li className="nav-item">
                  <Link to={"/pay"} className="nav-link active" aria-current="page">
                    pay
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/Devotee/dashboard"} className="nav-link active" aria-current="page">
                    History
                  </Link>
                </li>
              </>
            )}
          </ul>
          {logged == true ? (
            <button className="btn btn-outline-danger" type="submit" onClick={() => handleLogout()}>
              Logout
            </button>
          ) : (
            <Link to={"/"} className="btn btn-outline-success" type="submit">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
