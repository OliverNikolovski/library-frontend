import axios from "../custom-axios/axios";

const LibraryRepository = {

    controller: new AbortController(),

    fetchBooks() {
        return axios.get("/books/all");
    },

    getBook(id) {
        return axios.get(`/books/${id}`);
    },

    fetchCategories() {
        return axios.get("/categories");
    },

    fetchAuthors() {
        return axios.get("/authors");
    },

    addBook(name, category, authorId, availableCopies) {
        return axios.post("/books/add", {
            name, category, authorId, availableCopies
        });
    },

    editBook(id, name, category, authorId, availableCopies) {
        return axios.put(`/books/edit/${id}`, {
            name, category, authorId, availableCopies
        });
    },

    deleteBook(id) {
        return axios.delete(`/books/delete/${id}`);
    },

    markBookAsTaken(id) {
        return axios.put(`/books/mark/${id}`);
    },

    abortRequest() {
        this.controller.abort();
    }

};

export default LibraryRepository;