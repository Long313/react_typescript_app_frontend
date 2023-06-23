import { NavLink } from "react-router-dom";
import "./subnavigate.css";
function SubNavigate() {
  return (
    <div className="sub-nav">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : "normal"
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/articles"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : "normal"
        }
      >
        Articles
      </NavLink>
    </div>
  );
}

export default SubNavigate;
