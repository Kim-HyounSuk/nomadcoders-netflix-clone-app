import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import TV from "./Routes/TV";

const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/movie/:movieId" element={<Home />} />
        </Route>
        <Route path="/tv" element={<TV />}>
          <Route path="/tv/:tvId" element={<TV />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
