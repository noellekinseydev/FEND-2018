import React from "react";
import BookShelfChanger from "./BookShelfChanger";

const Book = props => {
  //Set a variable that reflects whether book has an imageLinks prop.
  let thumbnailPresent = props.book.imageLinks
    ? //If yes, set variable to the thumbnail value.
      props.book.imageLinks.thumbnail
    : //If no, set to empty so error is not triggered.
      "";

  let authorText = props.book.authors ? props.book.authors.join(", ") : "";

  return (
    <div className="book" id={props.book.id}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url("${thumbnailPresent})`
          }}
        />

        {/*Attach a bookshelf changer to each book*/}
        <BookShelfChanger
          book={props.book}
          shelves={props.shelves}
          currentShelf={props.currentShelf}
          moveBook={props.moveBook}
        />
      </div>
      <div className="book-info">
        <div className="book-title"><h2>{props.book.title}</h2></div>
        <div className="book-authors"><h3>{authorText}</h3></div>
        <hr></hr>
      </div>
      
    </div>
  );
};

export default Book;
