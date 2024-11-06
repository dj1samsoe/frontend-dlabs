import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import CrudPage from "./pages/crud";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen max-w-screen bg-gray-100 p-6">
        <nav className="flex justify-center space-x-4 mb-6 bg-white p-3 rounded-full w-fit mx-auto">
          <Link
            to="/"
            className="px-3 py-2 hover:bg-neutral-100 transition-all rounded-full"
          >
            Home
          </Link>
          <Link
            to="/crud"
            className="px-3 py-2 hover:bg-neutral-100 transition-all rounded-full"
          >
            CRUD Page
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud" element={<CrudPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
