import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailMovie from "./pages/DetailMovie";
import "../src/styles/app.css";
import TopRated from "./pages/TopRated";
import NowPlaying from "./pages/NowPlaying";
import UpComing from "./pages/UpComing";
import Search from "./pages/Search";
import Popular from "./pages/Popular";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/up-coming" element={<UpComing />} />
        <Route path="/detail/:id" element={<DetailMovie />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
