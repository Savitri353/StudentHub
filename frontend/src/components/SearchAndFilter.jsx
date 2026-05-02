import { useState } from "react";
import API from "../api/axios";

function SearchBooks({ setBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");

  const handleSearch = async () => {
    try {
      const res = await API.get(
        `/books/search?title=${title}&author=${author}&semester=${semester}&department=${department}`
      );

      setBooks(res.data);
    } catch (error) {
      console.error("Search failed");
    }
  };

  return (
    <div>

      {/* Title Search */}
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Author Search */}
      <input
        type="text"
        placeholder="Search by author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      {/* Semester Filter */}
      <select onChange={(e) => setSemester(e.target.value)}>
        <option value="">All Semesters</option>
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 3</option>
        <option value="4">Semester 4</option>
      </select>

      {/* Department Filter */}
      <select onChange={(e) => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="CSE">CSE</option>
        <option value="Mechanical">Mechanical</option>
      </select>

      <button onClick={handleSearch}>Search</button>

    </div>
  );
}

export default SearchBooks;