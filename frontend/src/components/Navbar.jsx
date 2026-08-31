import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  const userName =
    user?.fullName ||
    user?.name ||
    "User";

  return (
    <div className="navbar">
      <h2>Accounts Settlement Tracker</h2>

      <div className="profile">
        <span>
          Welcome, {userName}
        </span>
      </div>
    </div>
  );
}

export default Navbar;