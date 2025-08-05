import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", isbn: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:8085/api/books");
    setBooks(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8085/api/books", form);
    setForm({ title: "", author: "", isbn: "" });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8085/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      <form onSubmit={handleAdd} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="ISBN"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Books List</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="border p-2 mb-2 flex justify-between">
            <span>{book.title} - {book.author} (ISBN: {book.isbn})</span>
            <button
              onClick={() => handleDelete(book.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
