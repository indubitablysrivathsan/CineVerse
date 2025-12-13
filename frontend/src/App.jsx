import { Routes, Route } from "react-router-dom";
import FilmList from "./pages/FilmList";
import FilmDetail from "./pages/FilmDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FilmList />} />
      <Route path="/films/:id" element={<FilmDetail />} />
    </Routes>
  );
}

export default App;
