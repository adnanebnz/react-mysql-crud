import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllbooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/books");
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllbooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:4000/books/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl mb-9">My Bookshop</h1>
      <div className="flex flex-1 gap-3">
        {books.map((book) => (
          <div
            className="flex flex-1 flex-col gap-2 items-center"
            key={book.id}
          >
            {book.cover && (
              <img
                src={book.cover}
                className="w-72 h-80 object-cover bg-red-500"
              />
            )}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button
              className="py-3 px-6 bg-white cursor-pointer text-red-500 border border-solid border-gray-400"
              onClick={() => handleDelete(book.id)}
            >
              Delete
            </button>
            <button className="py-3 px-6 bg-white cursor-pointer text-indigo-700 border border-solid border-gray-400">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <div>
        {" "}
        <button className="border border-solid border-gray-400 p-4 mt-10 ">
          <Link to={"/add"}>Add New Book</Link>
        </button>
      </div>
    </div>
  );
};

export default Books;
