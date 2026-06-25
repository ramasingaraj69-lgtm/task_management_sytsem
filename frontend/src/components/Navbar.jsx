import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("name");

    navigate("/");
  };

  return (

    <nav className="navbar navbar-dark py-3 bg-dark px-5 d-flex justify-content-between">

      <h3 className="text-white">
        Task Manager
      </h3>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;