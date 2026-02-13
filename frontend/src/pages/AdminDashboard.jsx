import axios from "../api/axios";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);

  const fetchPendingBooks = async () => {
    const res = await axios.get(
      "/admin/books/pending",
      { withCredentials: true }
    );
    console.log("Pending books API response 👉", res.data);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchPendingBooks();
  }, []);

  const approveBook = async (id) => {
    await axios.put(
      `/admin/books/approve/${id}`,
      {},
      { withCredentials: true }
    );
    alert("Book approved ✅");
    fetchPendingBooks();
  };

  const rejectBook = async (id) => {
    await axios.put(
      `/admin/books/reject/${id}`,
      {},
      { withCredentials: true }
    );
    alert("Book rejected ❌");
    fetchPendingBooks();
  };

  return (
  <div className="admin-container">
    <h2 className="admin-heading">📚 Pending Books</h2>

    {books.length === 0 && (
      <p className="admin-empty">No pending books.</p>
    )}

    {books.map((book) => (
      <div key={book._id} className="admin-card">
        <p className="admin-title">
          <strong>{book.title}</strong>
        </p>

        <div className="admin-actions">
          <button
            className="admin-approve"
            onClick={() => approveBook(book._id)}
          >
            Approve
          </button>

          <button
            className="admin-reject"
            onClick={() => rejectBook(book._id)}
          >
            Reject
          </button>
        </div>
      </div>
    ))}
  </div>
);

}
