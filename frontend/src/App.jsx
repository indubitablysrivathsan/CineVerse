import { Routes, Route } from "react-router-dom";
import FilmList from "./pages/FilmList";
import FilmDetail from "./pages/FilmDetail";
import Login from "./pages/Login";
import Journal from "./pages/Journal"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<FilmList />} />
      <Route path="/films/:id" element={<FilmDetail />} />
      <Route path="/journal" element={<Journal />} />
    </Routes>
  );
}

export default App;
