import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBookForm.css";

export default function EditBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/books/${id}`, {
          withCredentials: true,
        });

        const book = res.data.book;

        setForm({
          title: book.title,
          author: book.author,
          price: book.price,
          semester: book.semester,
          department: book.department,
          description: book.description || "",
          image: null, // New uploaded file
          oldImage: book.image, // Existing image URL
        });
      } catch (error) {
        alert("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);
    data.append("author", form.author);
    data.append("price", form.price);
    data.append("semester", form.semester);
    data.append("department", form.department);
    data.append("description", form.description);

    // Send image only if a new one is selected
    if (form.image) {
      data.append("image", form.image);
    }

    try {
      await axios.put(`/books/edit/${id}`, data, {
        withCredentials: true,
      });

      alert("Book updated and sent for approval");
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="editbook-container">
      <h2 className="editbook-heading">Edit Book</h2>

      <form
        className="editbook-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Book Title"
          required
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
          required
        />

        <label htmlFor="price">Price (₹)</label>
        <input
          id="price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          required
        />

        <label htmlFor="semester">Semester</label>
        <input
          id="semester"
          value={form.semester}
          onChange={(e) => setForm({ ...form, semester: e.target.value })}
          placeholder="Semester"
          required
        />

        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        >
          <option value="">Select Department</option>

          <option>Artificial Intelligence and Machine Learning</option>
          <option>Automobile Engineering</option>
          <option>Biomedical Engineering</option>
          <option>Chemical Engineering</option>
          <option>Civil Engineering</option>
          <option>Computer Engineering</option>
          <option>Electrical Engineering</option>
          <option>Electronics and Communication Engineering</option>
          <option>Environmental Engineering</option>
          <option>Information Technology</option>
          <option>Inst. & Control Engg.</option>
          <option>Mechanical Engineering</option>
          <option>Plastic Technology</option>
          <option>Robotics and Automation</option>
          <option>Rubber Technology</option>
          <option>Science and Humanities</option>
          <option>Textile Technology</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />

        {form.oldImage && (
          <>
            <label>Current Image</label>
            <img
              src={form.oldImage}
              alt="Current Book"
              className="current-book-image"
            />
          </>
        )}

        <label htmlFor="image">Choose New Image (Optional)</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files[0],
            })
          }
        />

        <div className="editbook-actions">
          <button type="submit" className="editbook-btn">
            Update Book
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
