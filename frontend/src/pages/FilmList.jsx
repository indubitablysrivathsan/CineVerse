import { useEffect, useState } from "react";
import { fetchFilmsWithFilters } from "../lib/api";
import FilmCard from "../components/FilmCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./theme.css";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Draft inputs (typing does NOT trigger search) */
  const [draftFilters, setDraftFilters] = useState({
    title: "",
    director: "",
    genre: "",
    language: "",
    mood: "",
    festival: "",
    era: "",
  });

  /* Applied filters (used for API call) */
  const [filters, setFilters] = useState({});

  /* Load ALL films on first render */
  useEffect(() => {
    setFilters({});
  }, []);

  /* Fetch films ONLY when filters change */
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilmsWithFilters(filters);
        setFilms(data);
      } catch {
        setError("Failed to load films");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters]);

  function handleSearch() {
    setFilters({ ...draftFilters });
  }

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main className="container" style={{ paddingTop: "120px" }}>
        {/* HEADER */}
        <section className="section">
          <h1 className="heading-serif">
            Cine<span className="text-gold">Scope</span>
          </h1>
          <p className="text-muted" style={{ maxWidth: "620px" }}>
            Explore cinema by director, language, movement, and mood — curated
            beyond algorithms.
          </p>

          {/* SEARCH PANEL */}
          <div className="filter-panel">
            {/* PRIMARY SEARCH */}
            <div className="filter-row">
              <input
                placeholder="Film name"
                value={draftFilters.title}
                onChange={(e) =>
                  setDraftFilters({ ...draftFilters, title: e.target.value })
                }
              />
              <input
                placeholder="Director"
                value={draftFilters.director}
                onChange={(e) =>
                  setDraftFilters({
                    ...draftFilters,
                    director: e.target.value,
                  })
                }
              />

            {/* SECONDARY SEARCH */}
              <input
                placeholder="Genre"
                value={draftFilters.genre}
                onChange={(e) =>
                  setDraftFilters({ ...draftFilters, genre: e.target.value })
                }
              />
              <input
                placeholder="Language"
                value={draftFilters.language}
                onChange={(e) =>
                  setDraftFilters({
                    ...draftFilters,
                    language: e.target.value,
                  })
                }
              />

            {/* CURATION FILTERS */}
              <input
                placeholder="Mood"
                value={draftFilters.mood}
                onChange={(e) =>
                  setDraftFilters({ ...draftFilters, mood: e.target.value })
                }
              />
              {/* <input
                placeholder="Festival"
                value={draftFilters.festival}
                onChange={(e) =>
                  setDraftFilters({
                    ...draftFilters,
                    festival: e.target.value,
                  })
                }
              />
              <input
                placeholder="Era / Movement"
                value={draftFilters.era}
                onChange={(e) =>
                  setDraftFilters({ ...draftFilters, era: e.target.value })
                }
              /> */}
            </div>

            <div className="filter-actions">
              <button className="btn-outline" onClick={handleSearch}>
                SEARCH
              </button>
            </div>
          </div>
        </section>

        {/* STATUS */}
        {loading && <p className="text-muted">Loading films…</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {/* FILM GRID */}
        <section className="section" style={{ paddingTop: "40px" }}>
          <div className="grid">
            {films.map((film) => (
              <Link
                key={film.id}
                to={`/films/${film.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FilmCard film={film} />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default FilmList;