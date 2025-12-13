import { useEffect, useState } from "react";
import { fetchFilmsWithFilters } from "../lib/api";
import FilmCard from "../components/FilmCard";
import { Link } from "react-router-dom";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
  mood: "",
  festival: "",
  era: "",
});

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchFilmsWithFilters(filters);
        setFilms(data);
      } catch (err) {
        setError("Failed to load films");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading films…</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui"}}>
      <h1>CineVerse</h1>
      <p style={{ opacity: 0.7 }}>
        CineScope - Arthouse Film Discovery
      </p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <input
            placeholder="Mood (e.g. melancholic)"
            value={filters.mood}
            onChange={(e) =>
            setFilters({ ...filters, mood: e.target.value })
            }
        />

        <input
            placeholder="Festival (e.g. Cannes)"
            value={filters.festival}
            onChange={(e) =>
            setFilters({ ...filters, festival: e.target.value })
            }
        />

        <input
            placeholder="Era (e.g. Iranian New Wave)"
            value={filters.era}
            onChange={(e) =>
            setFilters({ ...filters, era: e.target.value })
            }
      />
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
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
    </div>
  );
}

export default FilmList;
