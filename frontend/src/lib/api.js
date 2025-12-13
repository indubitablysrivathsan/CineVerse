const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

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

export async function fetchJournal(token) {
  const res = await fetch(`${API_URL}/journal`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load journal");
  return res.json();
}

export async function addJournalEntry(token, data) {
  const res = await fetch(`${API_URL}/journal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add entry");
  return res.json();
}

export async function deleteJournalEntry(id, token) {
  const res = await fetch(`http://localhost:4000/journal/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete entry");
  }

  return res.json();
}
