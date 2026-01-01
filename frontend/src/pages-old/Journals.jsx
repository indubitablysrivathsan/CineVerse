import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJournal } from "../lib/api";

function Journals() {
  const token = localStorage.getItem("token");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await fetchJournal(token);
      setEntries(data);
      setLoading(false);
    }
    load();
  }, [token]);

  if (loading) return <p>Loading journal…</p>;

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "#fff",
            cursor: "pointer", // indicate clickable
          }}
          onClick={() => navigate(`/journals/me/${entry.id}`)}
        >
          <h3 style={{ margin: "0 0 0.5rem 0" }}>
            {entry.film?.title || "Untitled Film"}
          </h3>

          {entry.rating != null && (
            <p>
              <strong>Rating:</strong> {entry.rating} / 10
            </p>
          )}

          {entry.note && <p>{entry.note}</p>}

          <small style={{ color: "#666" }}>
            Visibility:{" "}
            {entry.visibility}
            <br />
            Watched:{" "}
            {entry.watchedOn
              ? new Date(entry.watchedOn).toLocaleDateString()
              : "-"}
            <br />
            Added: {new Date(entry.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Journals;