function FilmCard({ film }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        background: "#242424ff",
      }}
    >
      <img 
        src={film.posterUrl} 
        style={{width: "100%", aspectRatio: "2/3", borderRadius: "4px", marginBottom: "0.5rem" }} 
        alt={film.title} 
      />

      <h3 style={{ marginBottom: "0.25rem" }}>{film.title}</h3>

      <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
        {film.year && `${film.year} · `}
        {film.director}
      </p>

      <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
        {film.country} {film.language && `· ${film.language}`}
      </p>

      {film.moods && (
        <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
          <strong>Mood:</strong> {film.moods}
        </p>
      )}
    </div>
  );
}

export default FilmCard;