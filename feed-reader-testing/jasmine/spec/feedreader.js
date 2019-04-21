/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This checkFeed function is constructed to avoid duplication and thus
     * make the entire application more efficient. 
     */
    function checkFeed(element) {
        expect(element).toBeDefined(); // Element must be defined...
        expect((element).length).toBeGreaterThan(0); // and have a length greater than 0...
        expect(element).not.toBe(''); // and not be an empty string.
    }

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        it('are defined.', () => {
            checkFeed(allFeeds); // Send each feed through the checkFeed function
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('do not have empty URLs.', () => {
            for (let feed of allFeeds) {
                checkFeed(feed.url); // Check the URL of each feed
                expect(feed.url).toMatch(/^(http|https):\/\//); // Ensure each feed URL is indeed a URL
            } 
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined non-empty names.', () => {
            for (let feed of allFeeds) {
                checkFeed(feed.name); // Check the name of each feed
                expect(typeof feed.name).toBe('string'); // Test that each feed name is a string
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', () => {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default.', () => {
            $(document).ready(function() {
                expect($('body').hasClass('menu-hidden')).toBe(true); // Expect the page to have the menu-hidden class initially
            });
        });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          * TODO: Refactor this. Maybe use beforeEach.
          */
         describe('is toggled when clicked.', () => {
             beforeEach(function() {
                $('.menu-icon-link').click(); // Toggle the menu before each test
             });

            it('is visible when clicked.', () => {
                expect($('body').hasClass('menu-hidden')).toBe(false);
             });
    
             it('is hidden when clicked again.', () => {
                expect($('body').hasClass('menu-hidden')).toBe(true);
             });
         });
    });
        

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('contains at least one entry.', (done) => {
            expect($('.feed').has($('.entry'))); // Feed has at least one entry
            checkFeed($('.entry')); // Check the entries
            done();
        });
    });
        

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let archive;
        let newContent;

        beforeEach((done) => {
            loadFeed(0, () => {
                archive = $('.feed').text(); // Set the archive to old content before new feed is fetched
                loadFeed(1, (done));
            });
        });

        it('fetches a new feed.', (done) => {
            newContent = $('.feed').text(); // Set fetched content as newContent
            expect(newContent).not.toBe(archive); // Compare new content with old content
            done();
        });
    });
        
}());
