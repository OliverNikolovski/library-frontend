import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LibraryRepository from '../../../repository/libraryRepository';
import Book from '../Book/book';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const retrieveBooks = () => {
        LibraryRepository.fetchBooks()
            .then(response => {
               // console.log(response);
                setIsPending(false);
                setError(null);
                setBooks(response.data);
            })
            .catch(err => {
                console.log(err);
                setIsPending(false);
                setError(err.message);
            })
    };

    const deleteBook = (id) => {
        LibraryRepository.deleteBook(id)
            .then(response => {
                console.log(response);
                setError(null);
                retrieveBooks();
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            });
    }

    const markAsTaken = (id) => {
        LibraryRepository.markBookAsTaken(id)
            .then((response) => {
                setBooks((prevBooks) => {
                    return prevBooks.map(book => book.id !== id ? book : response.data);
                });
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            });
    }

    useEffect(() => {
        retrieveBooks();
    }, []);

    return (
        <div className="table-responsive">
            {isPending && <div className="display-1">Loading...</div>}
            {error && <div className="text-danger">{error}</div>}
            {books && 
            <table className="table table-striped table-hover mt-3 caption-top">
                <caption>List of books</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Author</th>
                        <th scope="col">Available Copies</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map((book, index) => (
                        <Book book={book} deleteBook={deleteBook} markAsTaken={markAsTaken} key={book.id} idx={index}/>
                    ))}
                </tbody>
            </table>}
            <div className="d-flex w-100 mx-auto my-2 justify-content-center">
                <Link to="/books/add" className="btn btn-primary w-50">Add a new book</Link>
            </div>
        </div>
    );
}
 
export default Books;