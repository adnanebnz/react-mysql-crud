import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);
const navigate = useNavigate();
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
    <div className="p-4">
      <h1 className="text-center text-3xl mb-6">My Bookshop</h1>
      
      <div className="flex gap-9 px-8">
        {books.map((book) => (
          <div
            className="flex flex-col gap-2 items-center justify-center p-3 mt-2 border border-solid border-gray-300 shadow-lg hover:shadow-2xl hover:translate-x-0 hover:transition-all hover:-translate-y-3 cursor-pointer" style={{maxWidth:"300px"}}
            key={book.id}
            onClick={()=>navigate(`/books/${book.id}`)}
          >
            {book.cover && (
              <img
                src={book.cover}
                alt=""
                className="object-cover" height="200px" width="200px"
              />
            )}
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-center">{book.desc}</p>
            <span className="text-xl font-medium">{book.price} $</span>
            <div className="inline-flex rounded-md shadow-sm gap-1 mt-1" role="group">
            <button className="px-4 py-2 text-sm font-medium text-gray-300 bg-slate-900 border border-gray-200 rounded-lg hover:bg-slate-800 hover:text-green-500 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-slate-900 border border-gray-200 rounded-lg hover:bg-slate-800 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              onClick={() => handleDelete(book.id)}
            >
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="border border-solid border-gray-400 p-4 mt-10 ">
          <Link to={"/add"}>Add New Book</Link>
        </button>


        
      </div>
    </div>
  );
};

export default Books;
