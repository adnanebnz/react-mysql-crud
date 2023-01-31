import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateBook = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      axios.put("http://localhost:4000/books/" + bookId, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="mb-10">Update Book</h1>
      <form className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="insert book title"
          required
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="insert book description"
          required
          name="desc"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="insert book price"
          required
          name="price"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="insert book cover"
          required
          name="cover"
          onChange={handleChange}
        />
        <button
          onClick={handleClick}
          className="py-3 px-6 bg-red-500 text-white border border-solid border-gray-400"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
