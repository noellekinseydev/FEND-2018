import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  shelves = [
    { id: 1, value: "currentlyReading", title: "Currently Reading" },
    { id: 2, value: "wantToRead", title: "Want To Read" },
    { id: 3, value: "read", title: "Read" }
  ];

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              moveBook={this.moveBook}
              books={this.state.books}
              shelves={this.shelves}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchPage
              shelves={this.shelves}
              books={this.state.books}
              moveBook={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
