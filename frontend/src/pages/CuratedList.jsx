import { useEffect, useState } from "react";
import { fetchCurated } from "../lib/api";
import FilmCard from "../components/FilmCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function CuratedList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      const data = await fetchCurated(token);
      setFilms(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container" style={{ paddingTop: "120px" }}>
        <section className="section">
          <h1 className="heading-serif">
            Curated<span className="text-gold"> Picks</span>
          </h1>
          <p className="text-muted">
            Based on your reviews — same directors, same cinematic language.
          </p>
        </section>

        {loading && <p className="text-muted">Loading films…</p>}

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

export default CuratedList;