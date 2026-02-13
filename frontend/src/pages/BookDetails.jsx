import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import "./BookDetails.css";

export default function BookDetails() {
      const { id } = useParams();
      const [book, setBook] = useState(null);

    useEffect(() => {
         const fetchBook = async () => {
            try {
                const res = await axios.get(`/books/details/${id}`);
                setBook(res.data.book);
            } catch (error) {
            alert("Book not found");
            }
      };

      fetchBook();
      }, [id]);

       if (!book) {
       return <p>Loading book details...</p>;}

       return (
        <div className="book-details">
          <img src={book.image} className="details-image" />

          <div className="details-info">
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ₹ {book.price}</p>
          <p><strong>Sem:</strong> {book.semester}</p>
            <p><strong>Department:</strong> {book.department}</p>
          <p><strong>Description:</strong> {book.description}</p>
           <hr />
          <h3>Seller Information</h3>
          <p><strong>Name:</strong> {book.owner.name}</p>
          <p><strong>Phone:</strong> {book.owner.phone}</p>
          </div>
      </div>
                  
       )
  }