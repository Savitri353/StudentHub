import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Profile() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/books/my-books").then(res => setBooks(res.data));
  }, []);

  return (
    <div>
      <h2>My Books</h2>
      {books.map(book => (
        <div key={book._id}>
          <h4>{book.title}</h4>
          <p>Status: {book.isApproved ? "Approved" : "Pending"}</p>
            <Link to={`/edit-book/${book._id}`}>
              Edit Book
            </Link>
        </div>
      ))}
    </div>
  );
}
