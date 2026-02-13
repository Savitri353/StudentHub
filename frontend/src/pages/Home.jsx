import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "./Home.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedBooks = async () => {
      try {
        const res = await axios.get(
          "/books/approved",
          { withCredentials: true }
        );
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedBooks();
  }, []);

  if (loading) {
  return <p className="home-empty">Loading books...</p>;
   }

  return (
    <div className="home-container">
  <h2 className="home-heading">📚 Approved Books</h2>

  {books.length === 0 ? (
    <p className="home-empty">No approved books available.</p>
  ) : (
    <div className="home-grid">
      {books.map((book) => (
        <Link to={`/books/${book._id}`} className="book-link">

          <div key={book._id} className="home-card">
          <img
            src={book.image || "/default-book.png"}
            alt={book.title}
            className="home-image"
          /> 
          <h3 className="home-title">{book.title}</h3>
          <p className="home-author">
            <strong>Author:</strong> {book.author}
          </p>
          
        </div>
        </Link>
      ))}
    </div>
    )}
  </div>

  );
}
