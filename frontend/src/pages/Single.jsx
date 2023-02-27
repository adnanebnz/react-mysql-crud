import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Progress from "../components/Progress";
const Single = () => {
  const id = useParams().id;
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`http://localhost:4000/books/${id}`);
      setLoading(false);
      setBook(res.data[0]);
    }
    fetch()
      .then(console.log("success"))
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-12">
      <div className="flex justify-center gap-6">
        {loading && <Progress />}
        <div className="">
          <img src={book.cover} alt="" />
        </div>
        <div className="flex flex-col gap-3">
          <h1>{book.title}</h1>
          <p>{book.desc}</p>
          <h1 className="text-lg">{book.price}</h1>
          <button className="border border-solid border-black w-20 self-center mt-3 bg-teal-700 hover:bg-teal-800 transition text-white" onClick={()=>{
            navigate("/")
          }}>Go back</button>
        </div>
      </div>
    </div>
  );
};

export default Single;
