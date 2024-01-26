import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
      })
      .catch((error) => {
        alert("There was an error. Please check the console.");
        console.log(error);
      });
  }, []);

  const handleDeleteBook = () => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("An error happend. Check the console.");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Delete Book</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2x1">Are you sure you want to delete this book?</h3>
        <h2 className="font-bold">&quot;{title}&quot;</h2>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, delete it.
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
