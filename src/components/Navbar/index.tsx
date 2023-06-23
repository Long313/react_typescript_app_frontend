import { NavLink, useNavigate } from "react-router-dom";
import "./navbar..css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function Navbar() {
  const userCurrent = useSelector(
    (state: RootState) => state.auth.login.currentUser
  );
  return (
    <div className="nav_bar">
      {userCurrent?.user?.username && (
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : "normal"
          }
        >
          Home
        </NavLink>
      )}
      {userCurrent?.user?.username && (
        <p className="normal username">
          Hi, <span>{userCurrent?.user?.username}</span>
        </p>
      )}
      {!userCurrent?.user?.username && (
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : "normal"
          }
        >
          Login
        </NavLink>
      )}
      {!userCurrent?.user?.username && (
        <NavLink
          to="/register"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : "normal"
          }
        >
          Register
        </NavLink>
      )}
      {userCurrent?.user?.username && (
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : "normal"
          }
        >
          Logout
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
