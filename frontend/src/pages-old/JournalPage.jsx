import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchJournalById,
  fetchCommunityJournalById,
  editJournalEntry,
  deleteJournalEntry,
  updateJournalVisibility,
} from "../lib/api";

function JournalPage({ isOwner }) {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [currentEntry, setCurrentEntry] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = isOwner
          ? await fetchJournalById(id, token)
          : await fetchCommunityJournalById(id);

        setCurrentEntry(data);
        setVisibility(data.visibility);
        setFormData({
          rating: data.rating || "",
          note: data.note || "",
          watchedOn: data.watchedOn || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isOwner, token]);

  if (loading) return <p>Loading journal…</p>;
  if (!currentEntry) return <p>Journal not found.</p>;

  const handleSave = async () => {
    const updated = await editJournalEntry(id, token, formData);
    setCurrentEntry(updated);
    setEditing(false);
  };

  const handleVisibilityToggle = async () => {
    const newVisibility =
        visibility === "PRIVATE" ? "PUBLIC" : "PRIVATE";

    try {
        const updated = await updateJournalVisibility(
        currentEntry.id,
        token,
        newVisibility
        );

        setCurrentEntry((prev) => ({
            ...prev,
            visibility: updated.visibility,
        }));
        setVisibility(updated.visibility);
    } catch (err) {
        alert("Failed to update visibility");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this journal?")) return;
    await deleteJournalEntry(id, token);
    window.history.back();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h2>{currentEntry.film?.title || "Journal Entry"}</h2>

      {editing && isOwner ? (
        <>
          <input
            type="number"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />

          <textarea
            value={formData.note}
            onChange={(e) =>
              setFormData({ ...formData, note: e.target.value })
            }
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          {currentEntry.rating && (
            <p>Rating: {currentEntry.rating} / 10</p>
          )}
          <p>{currentEntry.note}</p>
          <br />
          <p style={{ opacity: 0.7 }}>{currentEntry.visibility}</p>

          {isOwner && (
            <>
            <button onClick={() => setEditing(true)}>Edit</button>

            <button
            onClick={handleVisibilityToggle}
            style={{ marginLeft: "0.5rem" }}
            >
            {visibility === "PRIVATE"
                ? "Make Public"
                : "Make Private"}
            </button>

            <button
            style={{ marginLeft: "0.5rem" }}
            onClick={handleDelete}
            >
            Delete
            </button>
            </>
          )}

        </>
      )}
    </div>
  );
}

export default JournalPage;