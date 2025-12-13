import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddToJournal({ filmId }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState("");
  const [note, setNote] = useState("");
  const [watchedOn, setWatchedOn] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filmId,
          rating,
          note,
          watchedOn,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add journal entry");
      }

      setMessage("Added to journal successfully");
      setRating("");
      setNote("");
      setWatchedOn("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3>Add to Journal</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Rating (1-5)</label>
        <br />
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Note</label>
        <br />
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows="4"
          required
        />
      </div>

      <div>
        <label>Watched Date</label>
        <br />
        <input
          type="date"
          value={watchedOn}
          onChange={e => setWatchedOn(e.target.value)}
          required
        />
      </div>

      <button type="submit" style={{ marginTop: "1rem" }}>
        Add to Journal
      </button>
    </form>
  );
}

export default AddToJournal;