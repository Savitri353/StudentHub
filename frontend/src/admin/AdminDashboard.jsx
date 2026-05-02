import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchBooks("pending");
  }, []);

  const fetchBooks = async (type) => {
    try {
      let endpoint = "";

      if (type === "pending") endpoint = "/books/pending";
      else if (type === "approved") endpoint = "/books/approved";
      else if (type === "all") endpoint = "/books";

      const res = await API.get(endpoint);
      setBooks(res.data);
      setFilter(type);

    } catch (error) {
      console.log(error);
    }
  };

  const approveBook = async (id) => {
    try {
      await API.put(`/books/approve/${id}`);
      fetchBooks(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectBook = async (id) => {
    try {
      await API.put(`/books/reject/${id}`);
      fetchBooks(filter);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => fetchBooks("all")}>All</button>
        <button onClick={() => fetchBooks("pending")}>Pending</button>
        <button onClick={() => fetchBooks("approved")}>Approved</button>
      </div>

      {/* Books Table */}
      <table border="1" cellPadding="10">
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
                  <button onClick={() => approveBook(book._id)}>
                    Approve
                  </button>
                )}
                <button onClick={() => rejectBook(book._id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;