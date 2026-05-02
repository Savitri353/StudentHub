import axios from "../api/axios";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalBooks: 0,
    pendingCount: 0,
  });
  const [filter, setFilter] = useState("pending");

  // Fetch Summary Data
  const fetchSummary = async () => {
    try {
      const res = await axios.get("/admin/books/summary", {
        withCredentials: true,
      });
      setSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Books Based on Filter
  const fetchBooks = async (type) => {
    try {
      let endpoint = "";

      if (type === "pending") endpoint = "/admin/books/pending";
      else if (type === "approved") endpoint = "/admin/books/approved";
      else endpoint = "/admin/books/all";

      const res = await axios.get(endpoint, {
        withCredentials: true,
      });

      setBooks(res.data);
      setFilter(type);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchBooks("pending");
  }, []);

  const approveBook = async (id) => {
    await axios.put(
      `/admin/books/approve/${id}`,
      {},
      { withCredentials: true }
    );
    fetchBooks(filter);
    fetchSummary();
  };

  const rejectBook = async (id) => {
    await axios.put(
      `/admin/books/reject/${id}`,
      {},
      { withCredentials: true }
    );
    fetchBooks(filter);
    fetchSummary();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Dashboard</h2>

      {/* 🟢 Section 1: Summary Cards */}
      <div className="admin-summary">
        <div className="summary-card">
          <h4>Total Users</h4>
          <p>{summary.totalUsers}</p>
        </div>

        <div className="summary-card">
          <h4>Total Books</h4>
          <p>{summary.totalBooks}</p>
        </div>

        <div className="summary-card">
          <h4>Pending Books</h4>
          <p>{summary.pendingCount}</p>
        </div>
      </div>

      {/* 🟢 Section 2: Filter Buttons */}
      <div className="admin-filters">
        <button onClick={() => fetchBooks("all")}>All</button>
        <button onClick={() => fetchBooks("pending")}>Pending</button>
        <button onClick={() => fetchBooks("approved")}>Approved</button>
      </div>

      {/* 🟢 Section 3: Book Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.owner?.name}</td>
              <td>{book.isApproved ? "Approved" : "Pending"}</td>
              <td>
                {!book.isApproved && (
                  <button
                    className="approve-btn"
                    onClick={() => approveBook(book._id)}
                  >
                    Approve
                  </button>
                )}

                <button
                  className="reject-btn"
                  onClick={() => rejectBook(book._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}