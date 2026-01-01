const BASE = process.env.BASE_URL;
const KEY = process.env.TMDB_KEY;

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export async function tmdbFetch(path, retries = 4) {
  const separator = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${separator}api_key=${KEY}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`TMDB ${res.status}`);
    }

    return res.json();
  } catch (err) {
    if (retries > 0) {
      await sleep(800);
      return tmdbFetch(path, retries - 1);
    }
    throw err;
  }
}
