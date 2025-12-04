import { addNewBook, getBooks } from "../data/books";
import { useState, useEffect } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    let mounted = true;
    getBooks().then((data) => {
      if (mounted) setBooks(data);
    });
    return () => { mounted = false };
  }, []);

  const addBook = (event) => {
    event.preventDefault();
    const newBook = {
      id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title: title,
      author: author,
    };

    // קוראים לפונקציה שמדמה "הוספה בצד השרת" ומקבלים את המטה-מעודכן
    addNewBook(newBook).then((updatedBooks) => {
      setBooks(updatedBooks);
      setTitle("");
    });
  };

  return (
    <div>
      <h2>רשימת ספרים</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong>
          </li>
        ))}
      </ul>

      <form onSubmit={addBook}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="title"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          name="author"
          placeholder="author"
        />
        <button type="submit">Add new book</button>
      </form>
    </div>
  );
}

export default Books;