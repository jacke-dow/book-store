import { useState } from "react";
import styles from "./styles.module.css";

const BookForm = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [ISBN, setISBN] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }
    if (!author.trim()) {
      validationErrors.author = "Author is required";
    }
    if (!year.trim()) {
      validationErrors.year = "Year is required";
    } else if (!/^\d{4}$/.test(year)) {
      validationErrors.year = "Invalid year format";
    }
    if (!ISBN.trim()) {
      validationErrors.ISBN = "ISBN is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(ISBN)) {
      validationErrors.ISBN = "ISBN must contain alphanumeric characters only";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newBook = {
      title,
      author,
      year,
      ISBN,
    };
    addBook(newBook);
    setTitle("");
    setAuthor("");
    setYear("");
    setISBN("");
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <h2 > 📖 Add a New Book 📖</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label className={styles.label}>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        <div className={styles.formItem}>
          <label className={styles.label}>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={styles.input} />
          {errors.author && <span className={styles.error}>{errors.author}</span>}
        </div>
        <div className={styles.formItem}>
          <label className={styles.label}>Year:</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className={styles.input} />
          {errors.year && <span className={styles.error}>{errors.year}</span>}
        </div>
        <div className={styles.formItem}>
          <label className={styles.label}>ISBN:</label>
          <input type="text" value={ISBN} onChange={(e) => setISBN(e.target.value)} className={styles.input} />
          {errors.ISBN && <span className={styles.error}>{errors.ISBN}</span>}
        </div>
        <button className={styles.button}  type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
