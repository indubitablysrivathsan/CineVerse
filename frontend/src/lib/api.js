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
  const json = await res.json();
  if (!res.ok) throw new Error("Login failed");
  return json;
}

export async function signOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function fetchUser(token) {
  const res = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
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
  const res = await fetch(`${API_URL}/journals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load journals");
  return res.json();
}

export async function fetchJournalById(id, token) {
  const res = await fetch(`${API_URL}/journals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Journal not found");
  }
  return res.json();
}

export async function addJournalEntry(token, data) {
  const res = await fetch(`${API_URL}/journals`, {
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

export async function editJournalEntry(id, token, data) {
  const res = await fetch(`${API_URL}/journals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to edit entry");
  return res.json();
}

export async function deleteJournalEntry(id, token) {
  const res = await fetch(`${API_URL}/journals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete entry");
  return res.json();
}

export async function fetchCommunityJournals() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/journals/community`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!res.ok) throw new Error("Failed to load community journals");
  return res.json();
}

export async function fetchCommunityJournalById(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/journals/community/${id}`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!res.ok) throw new Error("Journal not found");
  return res.json();
}

export async function updateJournalVisibility(id, token, visibility) {
  const res = await fetch(`${API_URL}/journals/${id}/visibility`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ visibility }),
  });

  if (!res.ok) throw new Error("Failed to update visibility");
  return res.json();
}