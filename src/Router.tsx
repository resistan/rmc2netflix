import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />}>
          <Route path="/movies/:movieId" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
