const API_URL = import.meta.env.VITE_API_URL;

export async function fetchFilms() {
  const res = await fetch(`${API_URL}/films`);
  if (!res.ok) {
    throw new Error("Failed to fetch films");
  }
  return res.json();
}

export async function fetchFilmById(id) {
  const res = await fetch(`${API_URL}/films/${id}`);
  if (!res.ok) {
    throw new Error("Film not found");
  }
  return res.json();
}

export async function fetchFilmsWithFilters(filters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([_, v]) => v)
  );

  const url =
    params.toString().length > 0
      ? `${API_URL}/films?${params.toString()}`
      : `${API_URL}/films`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}