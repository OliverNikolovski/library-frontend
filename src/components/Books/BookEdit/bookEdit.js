import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LibraryRepository from "../../../repository/libraryRepository";

const BookEdit = ({ categories, authors }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [availableCopies, setAvailableCopies] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);
    const [updateInProgress, setUpdateInProgress] = useState(false);

    useEffect(() => {
        LibraryRepository.getBook(id)
            .then(response => {
                setIsPending(false);
                setError(null);
                setName(response.data.name);
                setCategory(response.data.category);
                setAvailableCopies(response.data.availableCopies);
                setAuthorId(response.data.author?.id);
                setLoadedSuccessfully(true);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
                setLoadedSuccessfully(false);
            });
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdateInProgress(true);
        LibraryRepository.editBook(id, name, category, authorId, availableCopies)
            .then(response => {
                console.log("Edited book:", response);
                setUpdateInProgress(false);
                setError(null);
                navigate("/");
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
                setUpdateInProgress(false);
            });
    };

    return (
        <div className="container">
            {isPending && <div className="display-1">Loading...</div>}
            {error && <div className="display-3 text-danger">{error}</div>}
            {loadedSuccessfully &&
                <form onSubmit={handleSubmit} className="form-floating mt-3">
                    <h3 className="display-4 mb-3 text-start">EDIT BOOK</h3>
                    <div className="mt-3 text-start">
                        <label htmlFor="name" className="form-label lead">Name</label>
                        <input type="text" name="name" id="name" className="form-control form-control-lg"
                            value={name} onChange={(e) => setName(e.target.value)} required />

                    </div>
                    <div className="mt-3 text-start">
                        <label htmlFor="category" className="form-label lead">Category</label>
                        <select name="category" id="category" className="form-select form-select-lg" value={category}
                            onChange={(e) => setCategory(e.target.value)} required>
                            {categories.map((cat, index) => (
                                <option value={cat} key={index}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-3 text-start">
                        <label htmlFor="author" className="form-label lead">Author</label>
                        <select name="author" id="author" className="form-select form-select-lg" value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)} required>
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
                        {!updateInProgress && 
                            <button type="submit" className="btn btn-lg btn-primary col-md-4"
                                onClick={handleSubmit}>Update</button>}
                        {updateInProgress && 
                            <button className="btn btn-lg btn-primary col-md-4" disabled>Updating...</button>}
                    </div>
                </form>}
        </div>
    );
}

export default BookEdit;