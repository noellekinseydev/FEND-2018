import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends Component {
  state = {
    query: "",
    matchingBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query });
    this.fetchMatchingBooks(query);
  };

  fetchMatchingBooks = query => {
    query
      ? BooksAPI.search(query).then(matchingBooks => {
          matchingBooks.error
            ? this.setState({ matchingBooks: [] })
            : this.setState({ matchingBooks: matchingBooks });
        })
      : this.setState({ matchingBooks: [] });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          {this.state.query !== "" ? (
            <h3 className="searchResults">
              Your search for <span className="pink">"{this.state.query}"</span>{" "}
              yielded {this.state.matchingBooks.length} results:
            </h3>
          ) : (
            <h2 className="searchResults">
              Please enter a search term in the field above.
            </h2>
          )}
          <ol className="books-grid results-grid">
            {this.state.matchingBooks.map(matchingBook => {
              let shelf = "none";
              if (this.props.books.length > 0) {
                this.props.books.forEach(book => {
                  if (book.id === matchingBook.id) {
                    shelf = book.shelf;
                  }
                });
              }

              return (
                <li key={matchingBook.id} className="book-li search-li">
                  <Book
                    book={matchingBook}
                    shelves={this.props.shelves}
                    moveBook={this.props.moveBook}
                    currentShelf={shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
