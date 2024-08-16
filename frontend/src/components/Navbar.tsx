import { Link } from "react-router-dom";
import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  }

  const handleNiespodziankaClick = () => {
    navigate("/niespodzianka")
  }

  return(
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workouts App</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <button onClick={handleNiespodziankaClick}>Odbierz niespodziankę</button>
            </div>
          )}
        </nav>
        <nav>
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}