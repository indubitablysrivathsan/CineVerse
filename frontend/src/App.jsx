import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import FilmList from "./pages/FilmList";
import FilmDetail from "./pages/FilmDetail";
import CuratedList from "./pages/CuratedList"
import AddToJournal from "./pages/AddToJournal";
import Journals from "./pages/Journals";
import JournalPage from "./pages/JournalPage";
import ExploreJournals from "./pages/ExploreJournals";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Landing />} />
      <Route path="/films" element={<FilmList />} />
      <Route path="/films/:id" element={<FilmDetail />} />
      <Route path="/lists" element={<CuratedList />} />
      <Route path="/journals/new/:filmId" element={<AddToJournal />}/>
      <Route path="/journals/me" element={<Journals />} />
      <Route path="/journals/me/:id" element={<JournalPage isOwner={true} />}/>
      <Route path="/journals/community" element={<ExploreJournals />} />
      <Route path="/journals/community/:id" element={<JournalPage isOwner={false} />}/>
      <Route path="/profile/me" element={<Profile />} />
    </Routes>
  );
}

export default App;