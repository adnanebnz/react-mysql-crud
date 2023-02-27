import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import Single from "./pages/Single";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/books/:id" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
