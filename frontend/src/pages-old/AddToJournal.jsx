import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addJournalEntry } from "../lib/api";

function AddToJournal() {
  const { filmId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState("");
  const [note, setNote] = useState("");
  const [watchedOn, setWatchedOn] = useState("");
  const [visibility, setVisibility] = useState("PRIVATE");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const created = await addJournalEntry(token, {
        filmId: Number(filmId),
        rating,
        note,
        watchedOn,
        visibility,
      });

      navigate(`/journals/me/${created.id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Journal Entry</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating (1 - 10): </label>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>

        <br />

        <div>
          <label>Note: </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Watched On: </label>
          <input
            type="date"
            value={watchedOn}
            onChange={(e) => setWatchedOn(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Visibility: </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="PRIVATE">Private</option>
            <option value="PUBLIC">Public</option>
          </select>
        </div>

        <br />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Save Journal
        </button>
      </form>
    </div>
  );
}

export default AddToJournal;