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
    image: null,
  });

  const departments = [
    "Artificial Intelligence and Machine Learning",
    "Automobile Engineering",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "Environmental Engineering",
    "Information Technology",
    "Inst. & Control Engg.",
    "Mechanical Engineering",
    "Plastic Technology",
    "Robotics and Automation",
    "Rubber Technology",
    "Science and Humanities",
    "Textile Technology",
  ];

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("price", formData.price);
    data.append("semester", formData.semester);
    data.append("department", formData.department);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const res = await API.post("/books/add", data);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="addbook-container">
      {" "}
      <h2 className="addbook-heading">Add Book</h2>
      <form
        onSubmit={handleSubmit}
        className="addbook-form"
        encType="multipart/form-data"
      >
        <input
          name="title"
          placeholder="Book Title"
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          required
        />
        <div className="pricing-note">
          <h4>💡 Student-Friendly Pricing</h4>
          <p>
            StudentHub is a student-to-student marketplace. Please list your
            books and study materials at a fair and affordable price. Our goal
            is to help fellow students save money while allowing sellers to
            recover part of their cost.
          </p>
        </div>
        <input
          name="semester"
          placeholder="Semester"
          onChange={handleChange}
          required
        />

        <select name="department" onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <label htmlFor="image">Book Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <button type="submit" className="addbook-btn">
          Add Book
        </button>

        <h4>📢 Listing Policy</h4>
        <ul>
          <li>Only academic books and study-related equipment are allowed.</li>
          <li>
            Examples: Books, EGD instruments, calculators, and laboratory kits.
          </li>
          <li>
            Items such as laptops, mobile phones, tablets, headphones,
            furniture, and other unrelated products are strictly prohibited.
          </li>

          <li>
            Every listing is reviewed by the administrator before it becomes
            visible to other students.
          </li>
        </ul>
      </form>
    </div>
  );
}

export default AddBook;
