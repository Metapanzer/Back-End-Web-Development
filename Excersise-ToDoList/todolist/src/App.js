import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Work from "./pages/work";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </div>
  );
}

export default App;
