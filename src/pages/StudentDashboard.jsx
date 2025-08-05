import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:8085/api/books");
    setBooks(res.data);
  };

  const borrowBook = async (id) => {
    try {
      await axios.put(`http://localhost:8085/api/books/borrow/${id}`);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data || "Error borrowing book");
    }
  };

  const returnBook = async (id) => {
    try {
      await axios.put(`http://localhost:8085/api/books/return/${id}`);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data || "Error returning book");
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

      <input
        type="text"
        placeholder="Search by title or author..."
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id} className="mb-2">
            <div className="space-x-2">
              {book.title} - {book.author} (ISBN: {book.isbn}) -{" "}
              {book.available ? "Available" : "Borrowed"}
              {book.available ? (
                <button
                  className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
                  onClick={() => borrowBook(book.id)}
                >
                  Borrow
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
                  onClick={() => returnBook(book.id)}
                >
                  Return
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;

