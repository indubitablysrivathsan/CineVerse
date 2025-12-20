import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addJournalEntry } from "../lib/api";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />

      <main className="journal-form-page">
        <section>
        <header className="journal-form-header">
          <h1>Add Journal Entry</h1>
          <p className="journals-subtitle">
            Capture your thoughts about this film
          </p>
        </header>

        {error && <p className="form-error">{error}</p>}

        <form
          className="journal-form"
          onSubmit={handleSubmit}
        >
          <label>
            <span className="form-label">
              Rating (1–10)
            </span>
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              required
            />
          </label>

          <label>
            <span className="form-label">Notes</span>
            <textarea
              rows="5"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </label>

          <label>
            <span className="form-label">
              Watched On
            </span>
            <input
              type="date"
              value={watchedOn}
              onChange={(e) =>
                setWatchedOn(e.target.value)
              }
              required
            />
          </label>

          <label>
            <span className="form-label">
              Visibility
            </span>
            <select
              value={visibility}
              onChange={(e) =>
                setVisibility(e.target.value)
              }
            >
              <option value="PRIVATE">
                Private
              </option>
              <option value="PUBLIC">
                Public
              </option>
            </select>
          </label>

          <div className="journal-actions">
            <button
              type="submit"
              className="btn-outline"
            >
              Save Journal
            </button>
          </div>
        </form>
        </section>
      </main>
    </>
  );
}

export default AddToJournal;