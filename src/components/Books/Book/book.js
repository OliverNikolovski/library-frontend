import { Link } from 'react-router-dom';

const Book = ({ book, deleteBook, markAsTaken, idx }) => {
    return (
        <tr>
            <th scope="row">{idx}</th>
            <td>{book.name}</td>
            <td>{book.category}</td>
            <td>{book.author?.name + ' ' + book.author?.surname}</td>
            <td>{book.availableCopies}</td>
            <td>
                <Link to={`/books/edit/${book.id}`} className="btn btn-info btn me-2">Edit</Link>
                <button type="button" className="btn btn-danger btn me-2"
                    onClick={() => deleteBook(book.id)}>Delete</button>
                <button type="button" className="btn btn-success btn" disabled={book.availableCopies <= 0}
                    onClick={() => markAsTaken(book.id)}>Mark As Taken</button>
            </td>
        </tr>
    );
}

export default Book;