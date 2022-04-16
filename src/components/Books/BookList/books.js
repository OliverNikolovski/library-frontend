import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LibraryRepository from '../../../repository/libraryRepository';
import Book from '../Book/book';

const Books = ({pageSize}) => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const page = useRef(null);
    const pageItems = useRef([]);

    function retrieveBooks(pageNumber, pageSize) {
        //setBooks([]);
        LibraryRepository.fetchBooks(pageNumber, pageSize)
            .then(response => {
                page.current = response.data;
                pageItems.current = [...Array(page.current.totalPages).keys()];
                setError(null);
                setBooks(page.current.content);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
    };

    const deleteBook = (id) => {
        LibraryRepository.deleteBook(id)
            .then(response => {
                setError(null);
                retrieveBooks(pageNumber, pageSize);
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
        retrieveBooks(pageNumber, pageSize);
        return LibraryRepository.abortRequest();
    }, [pageNumber, pageSize]);

    return (
        <div className="table-responsive">
            {error && <div className="text-danger display-3">{error}</div>}
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
                        <Book book={book} deleteBook={deleteBook} markAsTaken={markAsTaken} key={book.id} 
                            idx={pageNumber * pageSize + index + 1}/>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Book pagination">
                <ul className="pagination justify-content-center">
                    <li className={pageNumber > 0 ? "page-item" : "page-item disabled"}>
                        <button type="button" className="page-link" aria-label="Previous"
                            onClick={() => setPageNumber(pageNumber - 1)}>
                            <span aria-hidden="true">Prev</span>
                        </button>
                    </li>
                    {pageItems.current.map(item => (
                        <li className={pageNumber !== item ? "page-item" : "page-item active"} key={item}>
                            <button type="button" className="page-link" onClick={() => setPageNumber(item)}
                                disabled={pageNumber === item}>{item + 1}</button>
                        </li>
                    ))}
                    <li className={pageNumber + 1 < page.current?.totalPages ? "page-item" : "page-item disabled"}>
                        <button type="button" className="page-link" aria-label="Next"
                            onClick={() => setPageNumber(pageNumber + 1)}>
                            <span aria-hidden="true">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="d-flex w-100 mx-auto my-5 justify-content-center">
                <Link to="/books/add" className="btn btn-primary w-50">Add a new book</Link>
            </div>
        </div>
    );
}
 
export default Books;