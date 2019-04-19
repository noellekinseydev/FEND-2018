$(document).ready(function() {

let cards = [ // Array of cards
    'fa-anchor',
    'fa-bicycle',
    'fa-bolt',
    'fa-bomb',
    'fa-cube',
    'fa-diamond',
    'fa-leaf',
    'fa-paper-plane-o'];

cards = cards.concat(cards); // Array with pairs

let clicks = 0;
let matches = 0;
let moves = 0;
let openCards = []; // Empty array to hold open cards
let starScore = 3;
let time = 0;
let timer = new Timer();
let timerStat = false;

const $cardChild = $('.card .fa');
const $modal = $('.modalContent');
const $moves = $('.moves');
const $newGame = $('.restart');
const $stars = $('.fa-star');
const $starScore = $('.starScore');
const $timer = $('.time');

init(); // Start the game

// New Game
function init() {
    shuffle(cards); // Shuffle cards
    addTiles(cards); // Add cards to the DOM
    $moves.text(moves); // Set initial "moves" text
    $stars.css('color', '#f1c40f'); // Set initial stars color
    $('.card').on('click', cardFlip); // Event Listener for card
    $newGame.on('click', resetGame); // Event Listener for reset game
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
    var currentIndex = cards.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

// Adding card tiles to DOM
function addTiles (cards) {
    for (const [index, value] of cards.entries()) { // For each card
        const card = document.createElement('li'); // Create a <li>
        card.classList.add('card'); // With the class .card
        card.innerHTML = '<i class="fa ' + [value] + '"></i>'; //And a <i> element with a class that corresponds to its value in the array
        document.querySelector('.deck').appendChild(card); //Then append the card to the deck
    }
}

function cardFlip(event) {
    event.preventDefault();

    let cardTile = $(this); // Card tile/div itself
    let cardValue = this.innerHTML; // Card icon
    ++clicks; // Increment clicks

    displayCard(cardTile, cardValue); // Display card symbol on click
    clicks === 2 && matchCheck(); // If there have been two clicks, call matchCheck()
}

// Display Card
function displayCard(cardTile, cardValue) {
    cardTile.addClass('open show clicked').off('click'); //Add CSS classes to display card, identify which card has been clicked, and prevent card from being clicked again

    addToOpen(cardValue); // Call addToOpen while passing in the card icon
}

// Add clicked cards to open array 
function addToOpen(cardValue) {
    openCards.push(cardValue); // Push the card icon to the openCards array
}

// Check if the cards match
function matchCheck(card) {
    !timerStat ? timerStat = true : false; // If the timer is not running, set it to run

    startTimer();
    incrementMoves();

    // If the first card's icon matches the second card's icon, lock the cards. Otherwise, call noMatch().
    return (openCards[0] === openCards[1] ? lockMatch() : noMatch());
}

/* Begin Timer
Using the EasyTimer.js library by Albert González: https://albert-gonzalez.github.io/easytimer.js/
*/ 
function startTimer() {
    timer.start();
    timer.addEventListener('secondsUpdated', function(e) {
        time = timer.getTimeValues();
        minutes = time.minutes;
        seconds = time.seconds;
        $timer.text(time);
        updateScore();
    });
}

// Increment moves
function incrementMoves() {
    ++moves; // Increase moves by one
    $moves.text(moves); // Change the moves text in DOM
}

// Update stars/score
function updateScore() {
    // If the moves are greater than or equal to 16, or if the time is greater than or equal to 1:45...
    if(moves >= 16 || (minutes >= 1 && seconds >= 45)) {
        starScore = 1; // Set the score to one
        $stars.eq(-2).css('color', '#000'); // Remove yellow from 2nd star
    } 
    // If the moves are greater than or equal to 11, or if the time is greater than or equal to 0:45...
    else if (moves >= 13 || (minutes <= 0 && seconds >= 45)) {
        starScore = 2; // Set the score to two
        $stars.last().css('color', '#000'); // Remove yellow from last star
    }
}

// Lock match
function lockMatch() {
    let clicked = $('.clicked'); // All cards that have been clicked in current move

    clicked.addClass('match').removeClass('clicked'); // Add the match CSS to card, but remove the clicked class
    clicked.effect('bounce', {times:5}, 800); // Animation

    clicks = 0; //Reset clicks to 0
    ++matches; //Increase number of matches by one
    openCards = []; //Reset the openCards array

    checkWin(matches); //Check if the game has been won
}

//No match
function noMatch() {
    let clicked = $('.clicked'); // All cards that have been clicked in current move

    clicked.addClass('nomatch').removeClass('clicked'); // Add the nomatch class but remove the clicked class
    clicked.effect( 'shake', {times:5}, 800 ); // Animation

    clicks = 0; // Reset clicks
    openCards = []; // Reset the array of open cards

    // Hide the nonmatching open cards after a brief pause
    setTimeout(function() {
        clicked.removeClass('nomatch show open').on('click', cardFlip);
    }, 1000);
}

// Check if game has been won
function checkWin(matches) {
    // If the number of matches is maxxed...
    if (matches == 8) {
        timer.stop(); // Stop the timer
        $starScore.text(starScore); // Set the score text to the current starScore
        $modal.css('display', 'block'); // Display the winning modal
    }
}

// Reset Game
function resetGame() {
    window.location.reload(); // Refresh the page if the reload icon is clicked
}

});


