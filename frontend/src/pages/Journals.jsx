import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJournal } from "../lib/api";
import Navbar from "../components/Navbar";

function Journals() {
  const token = localStorage.getItem("token");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await fetchJournal(token);
      setEntries(data);
      setLoading(false);
    }
    load();
  }, [token]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-center">Loading journal…</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="journals-page">
        <section>
        <header className="journals-header">
          <h1>My Journal</h1>
          <p className="journals-subtitle">
            Personal reflections and film notes
          </p>
        </header>

        <div style={{ height: "32px" }} />

        {entries.length === 0 ? (
          <p className="empty-state">No journal entries yet.</p>
        ) : (
          <div className="journal-grid">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="journal-card"
                onClick={() =>
                  navigate(`/journals/me/${entry.id}`)
                }
              >
                <h3 className="journal-card-title">
                  {entry.film?.title || "Untitled Film"}
                </h3>

                {entry.rating != null && (
                  <div className="journal-card-rating">
                    {entry.rating} / 10
                  </div>
                )}

                {entry.note && (
                  <p className="journal-card-note">
                    {entry.note}
                  </p>
                )}

                <div className="journal-card-meta">
                  <span>{entry.visibility}</span>
                  <span>
                    Watched:{" "}
                    {entry.watchedOn
                      ? new Date(
                          entry.watchedOn
                        ).toLocaleDateString()
                      : "-"}
                  </span>
                  <span>
                    Added:{" "}
                    {new Date(
                      entry.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
        </section>
      </main>
    </>
  );
}

export default Journals;