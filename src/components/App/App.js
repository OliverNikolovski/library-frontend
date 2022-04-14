import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/header'
import Books from '../Books/BookList/books';
import Categories from '../Categories/categories';
import BookEdit from '../Books/BookEdit/bookEdit';
import LibraryRepository from '../../repository/libraryRepository';
import { useEffect, useState } from 'react';
import BookAdd from '../Books/BookAdd/bookAdd';

function App() {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const retrieveCategories = () => {
    LibraryRepository.fetchCategories()
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }

  const retrieveAuthors = () => {
    LibraryRepository.fetchAuthors()
      .then(response => setAuthors(response.data))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    retrieveCategories();
  }, []);

  useEffect(() => {
    retrieveAuthors();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={ <Books/> } />
            <Route path="/books" element={ <Books/> } />
            <Route path="/categories" element={ <Categories categories={categories}/> }/>
            <Route path="/books/edit/:id" element={ <BookEdit categories={categories} authors={authors}/> } />
            <Route path="/books/add" element={ <BookAdd categories={categories} authors={authors}/> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
