import { useState } from "react";
import styles from "./styles.module.css";

const BookItem = ({ book, deleteBook, updateBook }) => {
  const { id, title, author, year, ISBN } = book;

  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAuthor, setUpdatedAuthor] = useState(author);
  const [updatedYear, setUpdatedYear] = useState(year);
  const [updatedISBN, setUpdatedISBN] = useState(ISBN);
  const [validationErrors, setValidationErrors] = useState({});

  const handleDelete = () => {
    deleteBook(id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!updatedTitle.trim()) {
      newErrors.title = "Title is required";
    }
    if (!updatedAuthor.trim()) {
      newErrors.author = "Author is required";
    }
    if (!updatedYear.trim()) {
      newErrors.year = "Year is required";
    } else if (!/^\d{4}$/.test(updatedYear)) {
      newErrors.year = "Invalid year format";
    }
    if (!ISBN.trim()) {
      validationErrors.ISBN = "ISBN is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(ISBN)) {
      validationErrors.ISBN = "ISBN must contain alphanumeric characters only";
    }


    setValidationErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const updatedBook = {
      id,
      title: updatedTitle,
      author: updatedAuthor,
      year: updatedYear,
      ISBN: updatedISBN,
    };
    updateBook(id, updatedBook);
    setEditing(false);
  };

  const handleCancel = () => {
    setUpdatedTitle(title);
    setUpdatedAuthor(author);
    setUpdatedYear(year);
    setUpdatedISBN(ISBN);
    setEditing(false);
  };

  return (
    <div className={styles.container}>
      <h3>🧾 {editing ? <input value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} /> : title}</h3>
      {validationErrors.title && <span className={styles.error}>{validationErrors.title}</span>}
      <p className={styles.formItem}>🧑‍Author: {editing ? <input value={updatedAuthor} onChange={(e) => setUpdatedAuthor(e.target.value)} /> : author}</p>
      {validationErrors.author && <span className={styles.error}>{validationErrors.author}</span>}
      <p className={styles.formItem}>📆 Year: {editing ? <input value={updatedYear} onChange={(e) => setUpdatedYear(e.target.value)} /> : year}</p>
      {validationErrors.year && <span className={styles.error}>{validationErrors.year}</span>}
      <p className={styles.formItem}>🔢 ISBN: {editing ? <input value={updatedISBN} onChange={(e) => setUpdatedISBN(e.target.value)} /> : ISBN}</p>
      {validationErrors.ISBN && <span className={styles.error}>{validationErrors.ISBN}</span>}

      {editing ? (
        <>
          <button className={styles.button} onClick={handleSave}>
            Save
          </button>
          <button className={styles.button} style={{ backgroundColor: "red" }} onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className={styles.button} onClick={handleEdit}>
            Edit
          </button>
          <button className={styles.button} style={{ backgroundColor: "red" }} onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default BookItem;
