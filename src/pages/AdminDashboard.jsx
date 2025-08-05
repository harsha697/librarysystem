import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", isbn: "" });
  const [editingBook, setEditingBook] = useState(null); // holds the book being edited

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:8085/api/books");
    setBooks(res.data);
  };

  const addBook = async () => {
    await axios.post("http://localhost:8085/api/books", {
      ...newBook,
      available: true,
    });
    setNewBook({ title: "", author: "", isbn: "" });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:8085/api/books/${id}`);
    fetchBooks();
  };

  const startEdit = (book) => {
    setEditingBook({ ...book });
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  const saveEdit = async () => {
    await axios.put(
      `http://localhost:8085/api/books/${editingBook.id}`,
      editingBook
    );
    setEditingBook(null);
    fetchBooks();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Book</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          className="border p-2 mr-2"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="ISBN"
          className="border p-2 mr-2"
          value={newBook.isbn}
          onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addBook}>
          Add
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            {editingBook?.id === book.id ? (
              <div className="space-x-2">
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  className="border p-1"
                />
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  className="border p-1"
                />
                <input
                  type="text"
                  value={editingBook.isbn}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, isbn: e.target.value })
                  }
                  className="border p-1"
                />
                <button
                  className="bg-green-500 text-white px-2 py-1"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-2 py-1"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                {book.title} - {book.author} (ISBN: {book.isbn}) -{" "}
                {book.available ? "Available" : "Borrowed"}
                <button
                  className="bg-yellow-500 text-white px-2 py-1"
                  onClick={() => startEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
