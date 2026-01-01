import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFilmById } from "../lib/api";

function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchFilmById(id);
        setFilm(data);
      } catch (err) {
        setError("Film not found");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading film…</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>{film.title}</h1>

      <p style={{ opacity: 0.8 }}>
        {film.year && `${film.year} · `}
        {film.director}
      </p>

      <p style={{ opacity: 0.7 }}>
        {film.country} {film.language && `· ${film.language}`}
      </p>

      {film.moods && (
        <p style={{ marginTop: "1rem" }}>
          <strong>Mood:</strong> {film.moods}
        </p>
      )}

      {film.themes && (
        <p>
          <strong>Themes:</strong> {film.themes}
        </p>
      )}

      {film.synopsis && (
        <p style={{ marginTop: "1.5rem", maxWidth: "700px" }}>
          {film.synopsis}
        </p>
      )}
      <button
        style={{ marginTop: "2rem" }}
        onClick={() => navigate(`/journals/new/${film.id}`)}
      >
        Add to Journal
      </button>
    </div>
  );
}

export default FilmDetail;