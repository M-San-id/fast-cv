import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from "./pages/Builder";
import Templates from "./pages/Templates";
import Home from "./pages/Home";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/templates" element={<Templates />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App