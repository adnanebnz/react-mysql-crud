import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <div className="h-screen py-0 px-10 flex items-center justify-center text-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
