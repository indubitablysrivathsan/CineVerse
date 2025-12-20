import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCommunityJournals } from "../lib/api";
import Navbar from "../components/Navbar";

function ExploreJournals() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCommunityJournals();
        setEntries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-center">
          Loading community journals…
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="journals-page">
        <section>
          <header className="journals-header">
            <h1>Community Journals</h1>
            <p className="journals-subtitle">
              Public reflections shared by the CineVerse community
            </p>
          </header>

          <div style={{ height: "32px" }} />

          {entries.length === 0 ? (
            <p className="empty-state">
              No community journals yet.
            </p>
          ) : (
            <div className="journal-grid">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="journal-card"
                  onClick={() =>
                    navigate(
                      `/journals/community/${entry.id}`
                    )
                  }
                >
                  <h3 className="journal-card-title">
                    {entry.film?.title ||
                      "Journal Entry"}
                  </h3>

                  {entry.rating != null && (
                    <div className="journal-card-rating">
                      {entry.rating} / 10
                    </div>
                  )}

                  {entry.note && (
                    <p className="journal-card-note">
                      {entry.note.length > 120
                        ? entry.note.slice(0, 120) +
                          "…"
                        : entry.note}
                    </p>
                  )}

                  <div className="journal-card-meta">
                    {entry.journalMood?.moodLabel && (
                      <span>
                        Mood:{" "}
                        {entry.journalMood.moodLabel}
                      </span>
                    )}
                    <span>
                      Added:{" "}
                      {new Date(
                        entry.createdAt
                      ).toLocaleDateString()}
                    </span>
                    <span>
                      By:{" "}
                      {entry.user?.displayName}
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

export default ExploreJournals;