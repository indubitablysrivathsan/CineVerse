import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCommunityJournals } from "../lib/api";

function ExploreJournals() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCommunityJournals();
        setEntries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading community journals…</p>;

  if (entries.length === 0)
    return <p>No community journals yet.</p>;

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
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(`/journals/community/${entry.id}`)
          }
        >
          <h3 style={{ margin: "0 0 0.5rem 0" }}>
            {entry.film?.title || "Journal Entry"}
          </h3>

          {entry.rating != null && (
            <p>
              <strong>Rating:</strong> {entry.rating} / 10
            </p>
          )}

          {entry.note && (
            <p>
              {entry.note.length > 120
                ? entry.note.slice(0, 120) + "…"
                : entry.note}
            </p>
          )}

          <small style={{ color: "#666" }}>
            {entry.journalMood?.moodLabel && (
              <>
                Mood: {entry.journalMood.moodLabel}
                <br />
              </>
            )}
            Added:{" "}
            {new Date(entry.createdAt).toLocaleDateString()}
            <br />
            By:{" "}
            {entry.user.displayName}
          </small>
        </div>
      ))}
    </div>
  );
}

export default ExploreJournals;