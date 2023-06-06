import { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import styles from "./App.module.css";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const staticBooks = [
      {
        id: 1,
        title: "Harry Potter",
        author: "J. K. Rowling",
        year: "1997",
        ISBN: "9780747532699",
      },
      {
        id: 2,
        title: "The Martian",
        author: "Andy Weir",
        year: "2011",
        ISBN: "9780747532699",
      },
    ];

    setBooks(staticBooks);
  }, []);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const updateBook = (bookId, updatedBook) => {
    const updatedBooks = books.map((book) => (book.id === bookId ? updatedBook : book));
    setBooks(updatedBooks);
  };

  const deleteBook = (bookId) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📚My Book Library 📚</h1>
      <div className={styles.card}>
        <BookForm addBook={addBook} />
      </div>
      <h2 style={{textAlign: "center"}}>📑 All Books 📑</h2>
      <div className={styles.card}>
        <BookList books={books} deleteBook={deleteBook} updateBook={updateBook} />
      </div>
    </div>
  );
};

export default App;
