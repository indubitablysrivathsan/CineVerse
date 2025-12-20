import { useState } from "react";
import { deleteJournalEntry, editJournalEntry } from "../lib/api";

function JournalDetail({ entry, token }) {
  const [currentEntry, setCurrentEntry] = useState(entry);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    rating: entry.rating || "",
    note: entry.note || "",
    watchedOn: entry.watchedOn || "",
  });
  const [loading, setLoading] = useState(false);

  if (!currentEntry) return <p>No journal entry selected.</p>;

  const handleEditSave = async () => {
    setLoading(true);
    try {
      const updated = await editJournalEntry(currentEntry.id, token, formData);
      setCurrentEntry(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h2>{currentEntry.film?.title || "Untitled Film"}</h2>

      {editing ? (
        <>
          <label>
            Rating:
            <input
              type="number"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Note:
            <textarea
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Watched On:
            <input
              type="date"
              value={
                formData.watchedOn
                  ? new Date(formData.watchedOn).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({ ...formData, watchedOn: e.target.value })
              }
            />
          </label>
          <br />
          <button onClick={handleEditSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button onClick={() => setEditing(false)} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {currentEntry.rating != null && (
            <p>
              <strong>Rating:</strong> {currentEntry.rating} / 5
            </p>
          )}
          {currentEntry.note && <p>{currentEntry.note}</p>}
          <p>
            <strong>Watched:</strong>{" "}
            {currentEntry.watchedOn
              ? new Date(currentEntry.watchedOn).toLocaleDateString()
              : "-"}
          </p>
          <p>
            <strong>Added:</strong>{" "}
            {new Date(currentEntry.createdAt).toLocaleDateString()}
          </p>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button
            style={{ marginLeft: "0.5rem", color: "red" }}
            onClick={async () => {
              if (!confirm("Delete this entry?")) return;

              await deleteJournalEntry(currentEntry.id, token);
              setCurrentEntry(null);
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default JournalDetail;