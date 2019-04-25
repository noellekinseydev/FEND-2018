import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class MainPage extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Library</h1>
        </div>

        <div className="list-books-content">
          <Shelf
            books={this.props.books}
            shelves={this.props.shelves}
            moveBook={this.props.moveBook}
          />

          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
