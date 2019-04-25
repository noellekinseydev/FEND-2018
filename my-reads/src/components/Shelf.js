import React, { Component } from "react";
import Book from "./Book";

class Shelf extends Component {
  render() {
    //Create a shelf for each shelf in shelves array from App.js
    return this.props.shelves.map(shelf => (
      <div className="bookshelf" id={shelf.value} key={shelf.id}>
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid main-grid">
            {this.props.books
              //If the shelf value of the book matches the value of the current shelf...
              .filter(book => book.shelf === shelf.value)
              .map(book => {
                //...make shelf equal the value of the matching book's shelf and...
                let shelf = book.shelf;
                //...return an <li> for that book.
                return (
                  <li key={book.id} className={`book-li ${book.shelf}`}>
                    <Book
                      book={book}
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
    ));
  }
}

export default Shelf;
