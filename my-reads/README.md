# MyReads Project

This is a project that was built for Udacity's Front End Development Nanodegree course.

This React-based virtual bookshelf app allows you to track and categorize books that you want to read, are currently reading, and have already read.

## Getting Started

To run this application:

1. Download or clone this git repository.
2. Run the command line from the application folder (MyReads).
3. Install project dependencies using `npm install`.
4. Run the application using `npm start`.
5. Visit the app by navigating to `localhost:3000` in your preferred browser.

## Folder Structure

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app.
    ├── App.test.js # Used for testing.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend.
    ├── components # Contains each React component I created.
      ├── Book.js # Template for each individual book.
      ├── BookShelfChanger.js # Controller for green   dropdown controller that moves books to          different shelves.
      ├── MainPage.js # Responsible for the main page of the application.
      ├── SearchPage.js # Responsible for the search   page of the application.
      ├── Shelf.js # Renders the shelves on the main   page of the application.
    ├── icons # Helpful images for the app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # Used for DOM rendering only.
```

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Resources Used

- [Starter Code for the React MyReads Project](https://github.com/udacity/reactnd-project-myreads-starter)
- [BooksAPI.js](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/src/BooksAPI.js)
- [Create React App](https://github.com/facebookincubator/create-react-app)
