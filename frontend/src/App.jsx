import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import EditBookForm from "./pages/EditBookForm";  
import BookDetails from "./pages/BookDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-book/:id" element={<EditBookForm />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
