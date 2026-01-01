import { useEffect, useState } from "react";
import { fetchUser } from "../lib/api";

function Profile() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("TOKEN:", token);


  useEffect(() => {
    async function load() {
      try {
        const data = await fetchUser(token);
        setUser(data);
      } catch (err) {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading User Data…</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>{user.displayName}</h1>

      <p>
        <strong>Member Since:</strong>{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <p style={{ opacity: 0.7 }}>
        {user.id} {user.email && `· ${user.email}`}
      </p>
    </div>
  );
}

export default Profile;