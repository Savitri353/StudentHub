import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/books/my-books").then((res) => setBooks(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      await axios.delete(`/books/delete/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Books</h2>

      <div className="profile-books">
        {books.map((book) => (
          <div key={book._id} className="profile-card">
            <img className="profile-image" src={book.image} alt={book.title} />
            <h4 className="profile-title">{book.title}</h4>

            <p className="profile-status">
              Status:
              <span className={book.isApproved ? "approved" : "pending"}>
                {book.isApproved ? " Approved" : " Pending"}
              </span>
            </p>

            <div className="profile-actions">
              <Link to={`/edit-book/${book._id}`} className="edit-btn">
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
