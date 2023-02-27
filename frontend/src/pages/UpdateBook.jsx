import React from "react";
import { useState } from "react";
import {  useNavigate,useParams } from "react-router-dom";
import axios from "axios";
const UpdateBook = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null
  });
  const [selectedFile, setSelectedFile] = useState(undefined);

  const navigate = useNavigate();
  const bookId = useParams().id;
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleClick = async (event) => {
    event.preventDefault();    

    const formData = new FormData();
    formData.append('title',book.title);
    formData.append('desc',book.desc);
    formData.append('cover', selectedFile);
    formData.append('price', book.price);
            
    axios({
      method: 'put',
      url: `http://localhost:4000/books/${bookId}`,
      data: formData,
      headers: {
        'Content-Type':'multipart/form-data'
      }
    })
    .then(
      (response) => {
        console.log("Category Saved..! ");
        navigate("/")
      },
      (error) => {
        console.log(error);
       console.log("Failed..!");
      }
    );  
  };
  return (
    <div className="flex flex-col justify-center items-center p-10 content-center">
      <h1 className="mb-4">Update Book</h1>
      <form className="flex flex-col gap-5"  encType="multipart/form-data">
        <input
          type="text"
          placeholder="insert book title"
          required
          name="title"
          onChange={handleChange}
        />
       <textarea
          type="text"
          placeholder="insert book description"
          className="h-40 p-3 border border-solid border-black"
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
          type="file"
          placeholder="insert book cover"
          required
          name="cover"
          onChange={handleFileSelect}
        />
        <input
        type="submit"
        value="Update"
          onClick={handleClick}
          className="px-3 py-3 text-gray-300 bg-slate-900 border border-gray-200 rounded-lg hover:bg-slate-800 hover:text-green-500 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
         />
      </form>
    </div>
  );
};

export default UpdateBook;
