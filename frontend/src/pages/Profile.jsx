import { useEffect, useState } from "react";
import { fetchUser } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    async function load() {
      try {
        const data = await fetchUser(token);
        setUser(data);
      } catch {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token, navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-center">Loading user…</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="page-center error">{error}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <section className="profile-header">
          <h1 className="profile-name">{user.displayName}</h1>

          <p className="profile-meta">
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </section>

        <section className="profile-details">
          <div className="profile-row">
            <span className="profile-label">User ID</span>
            <span className="profile-value">{user.id}</span>
          </div>

          {user.email && (
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{user.email}</span>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;