import { useEffect, useState } from "react";
import { fetchJournal } from "../lib/api";
import { deleteJournalEntry } from "../lib/api";
import EditJournal from "./EditJournal";

function Journal() {
  const token = localStorage.getItem("token");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

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
          }}
        >
          {/* Film title */}
          <h3 style={{ margin: "0 0 0.5rem 0" }}>
            {entry.film?.title || "Untitled Film"}
          </h3>

          {editingId === entry.id ? (
            <EditJournal
              entry={entry}
              onUpdated={(updated) => {
                setEntries((prev) =>
                  prev.map((e) => (e.id === updated.id ? updated : e))
                );
                setEditingId(null);
              }}
            />
          ) : (
            <>
              {/* Rating */}
              {entry.rating != null && (
                <p>
                  <strong>Rating:</strong> {entry.rating} / 5
                </p>
              )}

              {/* Note */}
              {entry.note && <p>{entry.note}</p>}

              {/* Dates */}
              <small style={{ color: "#666" }}>
                Watched:{" "}
                {entry.watchedOn
                  ? new Date(entry.watchedOn).toLocaleDateString()
                  : "-"}
                <br />
                Added: {new Date(entry.createdAt).toLocaleDateString()}
              </small>

              <br />
              <br />

              <button onClick={() => setEditingId(entry.id)}>
                Edit
              </button>
              <button
                style={{ marginLeft: "0.5rem", color: "red" }}
                onClick={async () => {
                    if (!confirm("Delete this entry?")) return;

                    await deleteJournalEntry(entry.id, token);
                    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
                }}
                >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Journal;