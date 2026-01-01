import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <section className="hero">
        <div>
          <h1>Where Cinema Becomes Art</h1>
          <p>
            Discover rare, overlooked and visionary films from global auteurs.
            Curated for those who seek cinema beyond the mainstream.
          </p>
          <button onClick={() => navigate("/films")}>EXPLORE COLLECTION</button>
        </div>
      </section>

      <section>
        <h2>
          Curated <span>Arthouse Picks</span>
        </h2>
        <p className="section-desc">
          Hand-selected films defined by mood, philosophy and visual language - not algorithms.
        </p>

        <div className="grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4" alt="Film" />
            <div className="card-content">
              <h3>Silent Geometry</h3>
              <p>Minimalist • Experimental</p>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1517602302552-471fe67acf66" alt="Film" />
            <div className="card-content">
              <h3>Midnight Frames</h3>
              <p>Noir • Psychological</p>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1502139214982-d0ad755818d8" alt="Film" />
            <div className="card-content">
              <h3>The Still Hour</h3>
              <p>Slow Cinema • Poetic</p>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1497032205916-ac775f0649ae" alt="Film" />
            <div className="card-content">
              <h3>Fragments of Light</h3>
              <p>Visual Essay • Avant-garde</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;