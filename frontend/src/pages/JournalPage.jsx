import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchJournalById,
  fetchCommunityJournalById,
  editJournalEntry,
  deleteJournalEntry,
  updateJournalVisibility,
} from "../lib/api";
import Navbar from "../components/Navbar";

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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-center">Loading journal…</div>
      </>
    );
  }

  if (!currentEntry) {
    return (
      <>
        <Navbar />
        <div className="page-center error">Journal not found.</div>
      </>
    );
  }

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
    } catch {
      alert("Failed to update visibility");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this journal?")) return;
    await deleteJournalEntry(id, token);
    window.history.back();
  };

  return (
    <>
      <Navbar />

      <main className="journal-page">
        <section className="journal-content">
          <header className="journal-header">
            <h1 className="journal-title">
              {currentEntry.film?.title || "Journal Entry"}
            </h1>

            <div className="journal-meta">
              {currentEntry.rating && (
                <span>{currentEntry.rating} / 10</span>
              )}
              <span className="journal-visibility">
                {currentEntry.visibility}
              </span>
            </div>
          </header>

        
          {editing && isOwner ? (
            <>
              <div className="journal-edit">
                <label>
                  Rating
                  <input
                    type="number"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Notes
                  <textarea
                    rows="6"
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        note: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className="journal-actions">
                <button className="btn-outline" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn-danger"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="journal-note">
                {currentEntry.note || "No notes added."}
              </p>

              {isOwner && (
                <div className="journal-actions">
                  <button
                    className="btn-outline"
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-outline"
                    onClick={handleVisibilityToggle}
                  >
                    {visibility === "PRIVATE"
                      ? "Make Public"
                      : "Make Private"}
                  </button>

                  <button
                    className="btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default JournalPage;