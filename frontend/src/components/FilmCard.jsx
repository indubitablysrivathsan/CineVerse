function FilmCard({ film }) {
  return (
    <div className="card">
      <img
        src={film.posterUrl}
        alt={film.title}
        className="card-image"
      />

      <div className="card-content">
        <div className="card-title">
          {film.title}
        </div>

        <div className="card-sub">
          {film.director} • {film.year}
        </div>

        <div className="card-tags">
          {film.country} • {film.language}
        </div>

        <div className="card-tags">
          Tags: {film.tags}
        </div>

        <div className="card-tags">
          Mood: {film.moods}
        </div>
      </div>
    </div>
  );
}

export default FilmCard;

