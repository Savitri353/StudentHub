import { useState } from "react";
import API from "../api/axios";
import "./AddBook.css";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    semester: "",
    department: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/books/add", formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

 return (
  <div className="addbook-container">
    <h2 className="addbook-heading">Add Book</h2>

    <form onSubmit={handleSubmit} className="addbook-form">
      <input
        name="title"
        placeholder="Book Title"
        onChange={handleChange}
      />

      <input
        name="author"
        placeholder="Author"
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />

      <input
        name="semester"
        placeholder="Semester"
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />

      <button type="submit" className="addbook-btn">
        Add Book
      </button>
    </form>
  </div>
);
}

export default AddBook;
