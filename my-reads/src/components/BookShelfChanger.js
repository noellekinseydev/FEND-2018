import React from "react";

const BookShelfChanger = props => {
  return (
    <div className="book-shelf-changer">
      <select
        //Sets default value to equal the shelf that the book is on
        value={props.currentShelf}
        //Updates the shelf of the book to the selected value
        onChange={e => props.moveBook(props.book, e.target.value)}
      >
        <option value="move" disabled>
          Move to...
        </option>
        {/*Maps over shelves to create an option element for each*/}
        {props.shelves.map(shelf => (
          <option value={shelf.value} key={shelf.id}>
            {shelf.title}
          </option>
        ))}
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
