import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LibraryRepository from "../../../repository/libraryRepository";

const BookAdd = ({ categories, authors }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [availableCopies, setAvailableCopies] = useState(0);
    const [isAddInProgress, setIsAddInProgress] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAddInProgress(true);
        LibraryRepository.addBook(name, category, authorId, availableCopies)
            .then(response => {
                console.log("Added book: ", response.data);
                setIsAddInProgress(false);
                setError(null);
                navigate("/");
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
                setIsAddInProgress(false);
            })
    }

    return (
        <div className="container">
            {error && <div className="display-3 text-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="form-floating mt-3">
                <h3 className="display-4 mb-3 text-start">ADD BOOK</h3>
                <div className="mt-3 text-start">
                    <label htmlFor="name" className="form-label lead">Name</label>
                    <input type="text" name="name" id="name" className="form-control form-control-lg"
                        value={name} required placeholder="Enter book name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-3 text-start">
                    <label htmlFor="category" className="form-label lead">Category</label>
                    <select name="category" id="category" className="form-select form-select-lg" value={category}
                        onChange={(e) => setCategory(e.target.value)} required>
                        <option value="" hidden>Select category</option>
                        {categories.map((cat, index) => (
                            <option value={cat} key={index}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-3 text-start">
                    <label htmlFor="author" className="form-label lead">Author</label>
                    <select name="author" id="author" className="form-select form-select-lg" value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)} required>
                        <option value="" hidden>Select author</option>
                        {authors.map(a => (
                            <option value={a.id} key={a.id}>{a.name + " " + a.surname}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-3 text-start">
                    <label htmlFor="availableCopies" className="form-label lead">Available copies</label>
                    <input type="number" name="availableCopies" id="availableCopies"
                        className="form-control form-control-lg" min="0" step="1"
                        value={availableCopies} onChange={(e) => setAvailableCopies(e.target.value)} required />
                </div>
                <div className="row ms-1 mt-5">
                    {!isAddInProgress && 
                        <button type="submit" className="btn btn-lg btn-primary col-md-4"
                            onClick={handleSubmit}>Add</button>}
                    {isAddInProgress && 
                        <button className="btn btn-lg btn-primary col-md-4" disabled>Adding...</button>}
                </div>
            </form>
        </div>
    );
}

export default BookAdd;