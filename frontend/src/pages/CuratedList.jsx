import { useEffect, useState } from "react";
import { fetchCurated } from "../lib/api";
import FilmCard from "../components/FilmCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function CuratedList() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function load() {
      try {
        const data = await fetchCurated(token);
        setFilms(data);
      } catch {
        setError("Failed to load curated films");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token, navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-center">Loading curated picks…</div>
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

      <main className="container" style={{ paddingTop: "120px" }}>
        <section className="section">
          <h1 className="heading-serif">
            Curated<span className="text-gold"> Picks</span>
          </h1>
          <p className="text-muted">
            Based on your reviews — same directors, same genre lineage.
          </p>
        </section>

        <section className="section" style={{ paddingTop: "40px" }}>
          {films.length === 0 ? (
            <p className="text-muted">
              No curated films yet. Start reviewing films to generate picks.
            </p>
          ) : (
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
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default CuratedList;