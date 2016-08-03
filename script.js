// Initial game state
var buttons = ['greenBtn', 'redBtn', 'yellowBtn', 'blueBtn'];
var sequence = [];
var counter = 0;
var clickIndex = 0;
var gameActive = false; // Flag for if game has begun or not
var playing = false; // Flag for when actively animating a sequence, etc
var strict = false;
var winThreshold = 20;

// Illuminate the given button for 500ms and return to original state afterwards. Button is not interative for the duration.
// Input is expected to be the DOM object for a simonButton
function lightButton(selected) {
  $(selected).addClass('unclickable');
  var lightColor = '';
  var btnIndex = 0;

  switch (selected.id) {
    case 'greenBtn':
      lightColor = 'greenLight';
      btnIndex = 0;
      break;
    case 'redBtn':
      lightColor = 'redLight';
      btnIndex = 1;
      break;
    case 'yellowBtn':
      lightColor = 'yellowLight';
      btnIndex = 2;
      break;
    case 'blueBtn':
      lightColor = 'blueLight';
      btnIndex = 3;
      break;
  }

  // Lighten the button, play beep, and returned to dark state after 500ms
  $(selected).addClass(lightColor);
  playBeep(btnIndex);
  setTimeout(function() {
    $(selected).removeClass(lightColor).removeClass('unclickable');
  }, 500);
}

// Play a beep assosciated with each unique button
// Input is expected to be an integer within range 0-3
function playBeep(selectedBtn) {
  var baseUrl = "https://s3.amazonaws.com/freecodecamp/";
  var audio = ["simonSound1.mp3", "simonSound2.mp3", "simonSound3.mp3", "simonSound4.mp3"];
  // Play corresponding audio by appending base url to selected audio file
  new Audio(baseUrl + audio[selectedBtn]).play();
}

// Reset any existing simon sequences and counters to 0 and remove any visual
// indicators of progress
function gameReset() {
  sequence = [];
  $('#count').html(sequence.length);
  clickIndex = 0;
  gameActive = true;
  generateMove();
}

// Create and add a new move to the sequence
function generateMove() {
  var nextMove = Math.floor(Math.random() * 4);
  sequence.push(nextMove);
}

// Visually and audibly display the sequence to the player
function playSequence() {
  // Create an interval which evaluates every 600ms (encapsulates the 500ms of the blink/audio)
  var interval = setInterval(function() {
    playing = true;
    if (counter < sequence.length) {
      var currButton = $('#' + buttons[sequence[counter]]);
      // Index 0 of the returned object is the actual DOM object
      lightButton(currButton[0]);
      counter++;
    } else {
      counter = 0;
      playing = false;
      clearInterval(interval);
    }
  }, 600);
}

$(document).ready(function() {
  $('#start').click(function() {
    $('#start').addClass('unclickable');
    // Reset game
    gameReset();
    playSequence();
    $('#count').html(sequence.length);

    setTimeout(function() {
      $('#start').removeClass('unclickable');
    }, 500);
  });

  // Conditional logic for clicking a button at any point in the game
  $('.simonButton').click(function() {
    // If user selects the correct button at this point in the sequence and has now won the game
    if (gameActive && !playing && buttons[sequence[clickIndex]] === this.id && sequence.length === winThreshold && clickIndex === (winThreshold - 1)) {
      gameActive = false;
      lightButton(this);
      setTimeout(function() {
        alert("Congratulations! You've won by getting 20 correct in a row! Press 'start' to begin a new game...");
      }, 550);
    }
    // If user selects the correct button at this point in the sequence and at the end of the sequence
    else if (gameActive && !playing && buttons[sequence[clickIndex]] === this.id && (clickIndex + 1) === sequence.length) {
      lightButton(this);
      // Generate a new move and reset player progress
      generateMove();
      clickIndex = 0;

      // Display the new sequence...
      $('#count').html(sequence.length);
      setTimeout(function() {
        playSequence();
      }, 550);
    }
    // If user selects the correct button at this point in the sequence but isn't at the end of the sequence yet
    else if (gameActive && !playing && buttons[sequence[clickIndex]] === this.id) {
      lightButton(this);
      clickIndex++;
    }
    // ... If user selects incorrect button while in normal mode
    else if (gameActive && !playing && !strict) {
      lightButton(this);
      setTimeout(function() {
        alert("Oops! Close this box to view the correct order and try again!");
        clickIndex = 0;
      }, 550);
      // Replay sequence here
      setTimeout(function() {
        playSequence();
      }, 600);
    }
    // ... If user selects incorrect button while in strict mode
    else if (gameActive && !playing && strict) {
      lightButton(this);
      setTimeout(function() {
        alert("Oops! Strict mode is active, time to start from scratch!");
      }, 550);
      // Begin new game here
      gameReset();
      setTimeout(function() {
        playSequence();
      }, 600);
    }
    // Otherwise game isn't active, have no response
    console.log(sequence);
  });

  // Toggle state of strict for now until we get a real toggle button created
  $('#strict').click(function() {
    strict = !strict;
    strict ? $('#strict').addClass("btn-danger") : $('#strict').removeClass("btn-danger");
    console.log("Strict mode is now: " + strict);
  });
});
