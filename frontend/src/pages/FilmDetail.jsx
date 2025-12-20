import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFilmById } from "../lib/api";
import Navbar from "../components/Navbar";

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
    return (
      <>
        <Navbar />
        <div className="page-center">Loading film…</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="page-center error">{error}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="film-detail-page">
        <section className="film-content">
          <img src={film.posterUrl} className="film-img" />
          <h1 className="film-title">{film.title}</h1>

          <div className="film-meta">
            {film.year && <span>{film.year}</span>}
            {film.director && <span>· {film.director}</span>}
          </div>

          <div className="film-submeta">
            {film.country}
            {film.language && <span> · {film.language}</span>}
          </div>
          {film.moods && (
            <div className="film-block">
              <span className="label">Mood</span>
              <p>{film.moods}</p>
            </div>
          )}

          {film.themes && (
            <div className="film-block">
              <span className="label">Themes</span>
              <p>{film.themes}</p>
            </div>
          )}

          {film.synopsis && (
            <div className="film-block synopsis">
              <p>{film.synopsis}</p>
            </div>
          )}

        <div className="film-actions">
          <button className="btn-outline"
            onClick={() => navigate(`/journals/new/${film.id}`)}
          >
            Add to Journal
          </button>
        </div>
        </section>
      </main>
    </>
  );
}

export default FilmDetail;