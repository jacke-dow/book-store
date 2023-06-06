import BookItem from "./BookItem";
import styles from "./styles.module.css";

const BookList = ({ books, deleteBook, updateBook }) => {
  return (
    <div className={styles.container}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} deleteBook={deleteBook} updateBook={updateBook}/>
      ))}
    </div>
  );
};

export default BookList;
