import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBook.css";

export default function EditBookForm() {
  const { id } = useParams();        //  book ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState(null); // start as null
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch book and set previous values
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `/books/${id}`,
          { withCredentials: true }
        );

        const book = res.data.book;

        // ✅ PREVIOUS VALUES SET HERE
        setForm({
          title: book.title,
          author: book.author,
          price: book.price,
          semester: book.semester,
          department: book.department,
          description: book.description || "",
          image: book.image
        });

      } catch (error) {
        alert("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Prevent crash while loading
  if (loading) {
    return <p>Loading book details...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/books/edit/${id}`,
        form,
        { withCredentials: true }
      );

      alert("Book updated and sent for approval");
      navigate("/profile"); //  go back to profile

    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="edit-overlay">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h3>Edit Book</h3>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Title"
        />

        <input
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          placeholder="Author"
        />

        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          placeholder="Price"
        />

        <input
          value={form.semester}
          onChange={(e) =>
            setForm({ ...form, semester: e.target.value })
          }
          placeholder="Semester"
        />

        <input
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          placeholder="Department"
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
        />

        <input
          type="text"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
          placeholder="Image URL"
        />

        <div className="edit-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
