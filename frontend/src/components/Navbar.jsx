import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo">CineVerse</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/films">Discover</Link>
          <Link to="/lists">Curated Lists</Link>
          <Link to="/journals/me">MyJournal</Link>
          <Link to="/journals/community">Forum</Link>
          <Link to="/profile/me">Profile</Link>

          {!user ? (
            <Link to="/login">Sign In</Link>
          ) : (
            <Link to="/login" onClick={handleSignOut}>Sign Out</Link>
          )}
        </div>
      </div>

      {/* Logged-in user info */}
      {user && (
        <div className="nav-user-meta">
          <div className="nav-username">{user.displayName}</div>
          <div className="nav-email">{user.email}</div>
        </div>
      )}
    </header>
  );
}

export default Navbar;