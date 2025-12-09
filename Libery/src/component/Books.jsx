import { addNewBook, getBooks } from "../data/books";
import { useState, useEffect, use } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const books = await getBooks();
      setBooks(books);
      setError("");
    } catch (error) {
      console.log('Something bad happened', error);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addBook = (event) => {
    event.preventDefault();
    const newBook = {
      id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title: title,
      author: author,
    };
    try{
    addNewBook(newBook).then((updatedBooks) => {
      setBooks(updatedBooks);
      setTitle("");
      setAuthor("");
    });
    } catch (error) {
      console.log('Failed to add book', error);
      setError("Failed to add book. Please try again later.");
    }
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