import { useState } from "react";

function EditJournal({ entry, onUpdated }) {
  const [rating, setRating] = useState(entry.rating || "");
  const [note, setNote] = useState(entry.note || "");
  const [watchedOn, setWatchedOn] = useState(
    entry.watchedOn ? entry.watchedOn.slice(0, 10) : ""
  );
  const [visibility, setVisibility] = useState(entry.visibility || "private");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:4000/journal/${entry.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
            note,
            watchedOn,
            visibility,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      onUpdated(updated);
    } catch (err) {
      alert("Failed to update entry");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h4>Edit Journal Entry</h4>

      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rating"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      />

      <textarea
        placeholder="Your thoughts"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <input
        type="date"
        value={watchedOn}
        onChange={(e) => setWatchedOn(e.target.value)}
      />

      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
      >
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>

      <button disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

export default EditJournal;