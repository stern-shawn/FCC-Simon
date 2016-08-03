// Generate random move Math.floor(Math.random()*4)

// Initial game state
var buttons = ['greenBtn','redBtn','yellowBtn','blueBtn'];
var sequence = [];
var counter = 0;
var clickIndex = 0;
var gameActive = false;
var strict = false;
var winThreshold = 20;

// Illuminate the given button for 500ms and return to original state
// afterwards. Button is not interative for the duration.
// Input is expected to be the DOM object for a simonButton
function lightButton(selected) {
  $(selected).addClass('unclickable');

  var lightColor = '';
  var btnIndex = 0;

  console.log(selected.id);

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

  // Lighten the button
  $(selected).addClass(lightColor);
  // Play the beep for this button
  playBeep(btnIndex);

  // Note to self, 'this' within setTimeout refers to window by default, use a
  // variable to store the correct 'this' and pass it!
  // var that = this;
  // Wait 500ms then return button to darkened state
  setTimeout(function() {
    $(selected).removeClass(lightColor).removeClass('unclickable');
    console.log("Removing lighter colors");
  }, 500);
}

// Play a beep assosciated with each unique button
// Input is expected to be an integer within range 0-3
function playBeep(selectedBtn) {
  var baseUrl = "https://s3.amazonaws.com/freecodecamp/";
  var audio = ["simonSound1.mp3", "simonSound2.mp3", "simonSound3.mp3", "simonSound4.mp3"];
  // Play corresponding audio by appending base url to selected audio file
  console.log("Playing audio from: " + baseUrl + audio[selectedBtn]);
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
  var nextMove = Math.floor(Math.random()*4);
  console.log("Making next move at index: " + nextMove);
  sequence.push(nextMove);
}

// Visually and audibly display the sequence to the player
function playSequence() {
  // Create an interval which evaluates every 600ms (encapsulates the 500ms of the blink/audio)
  var interval = setInterval(function() {
    // console.log(counter);
    // console.log(sequence.length);
    if (counter < sequence.length) {
      console.log("Playing sequence at: " + sequence[counter]);
      var currButton = $('#' + buttons[sequence[counter]]);
      // Index 0 of the returned object is the actual DOM object
      lightButton(currButton[0]);
      counter++;
    } else {
      counter = 0;
      clearInterval(interval);
    }
  }, 600);

  // for (var i = 0; i < sequence.length; i++) {
  //   console.log("Playing sequence at: " + sequence[i]);
  //   var currButton = $('#' + buttons[sequence[i]]);
  //   lightButton(currButton[0]);
  //   // setTimeout(function() {
  //   //   // Index 0 of the returned object is the actual DOM object
  //   //   lightButton(currButton[0]);
  //   // }, 500);
  // }
}

$(document).ready(function() {
  $('#start').click(function() {
    $('#start').addClass('unclickable');
    // Reset game
    gameReset();
    playSequence();
    // Generate and do first move steps
    // var firstMove = Math.floor(Math.random()*4);
    // console.log("Starting game at index: " + firstMove);
    // // Put this first value in the sequence
    // sequence.push(firstMove);
    // generateMove();
    // Show the first move visibly to the user
    // console.log(buttons[firstMove]);
    // var firstButton = $('#' + buttons[sequence[0]]);
    // Index 0 of the returned object is the actual DOM object
    // console.log(firstButton[0]);
    // lightButton(firstButton[0]);

    $('#count').html(sequence.length);

    setTimeout(function() {
      $('#start').removeClass('unclickable');
    }, 500);
  });

  $('.simonButton').click(function() {
    console.log(this);
    // console.log(sequence);
    // console.log(sequence[clickIndex]);
    // console.log(buttons[sequence[clickIndex]]);
    // console.log(this.id);
    // lightButton(this);

    // If user selects the correct button at this point in the sequence and has now won the game

    // If user selects the correct button at this point in the sequence and at the end of the sequence
    if (gameActive && buttons[sequence[clickIndex]] === this.id && (clickIndex + 1) === sequence.length) {
      // alert("Correct!");
      lightButton(this);
      // Generate a new move and reset player progress
      generateMove();
      clickIndex = 0;

      // Display the new sequence...
      console.log("Positon in sequence should now be: " + clickIndex);
      console.log("Number of moves/count is now: " + sequence.length);
      console.log(sequence);
      $('#count').html(sequence.length);
      setTimeout(function() {
        playSequence();
      }, 500);

    }
    // If user selects the correct button at this point in the sequence but isn't at the end of the sequence yet
    else if (gameActive && buttons[sequence[clickIndex]] === this.id) {
      lightButton(this);
      clickIndex++;
      console.log("Index: " + clickIndex);
      console.log("Length: " + sequence.length);
    }
    // ... If user selects incorrect button while in normal mode
    else if (gameActive && !strict) {
      lightButton(this);
      alert("Oops! Close this box to view the correct order and try again!");
      clickIndex = 0;
      // Replay sequence here
      setTimeout(function() {
        playSequence();
      }, 500);
    }
    // ... If user selects incorrect button while in strict mode
    else if (gameActive && strict) {
      lightButton(this);
      alert("Oops! Strict mode is active, time to start from scratch!");
      // Begin new game here
      gameReset();
      setTimeout(function() {
        playSequence();
      }, 500);
    }
    // Otherwise game isn't active, have no response
    console.log(sequence);

//     var currColor = '';
//     var lightColor = '';

//     switch (this.id) {
//       case 'greenBtn':
//         currColor = 'green';
//         lightColor = 'greenLight';
//         break;
//       case 'redBtn':
//         currColor = 'red';
//         lightColor = 'redLight';
//         break;
//       case 'yellowBtn':
//         currColor = 'yellow';
//         lightColor = 'yellowLight';
//         break;
//       case 'blueBtn':
//         currColor = 'blue';
//         lightColor = 'blueLight';
//         break;
//     }

//     // Lighten the button for 500ms then return to normal state
//     $(this).addClass(lightColor);

//     // Note to self, 'this' within setTimeout refers to window by default, use a variable to store the correct 'this' and pass it!
//     var that = this;
//     setTimeout(function() {
//       $(that).removeClass(lightColor);
//       console.log("Removing lighter colors");
//     }, 500);
   });

  // Toggle state of strict for now until we get a real toggle button created
  $('#strict').click(function() {
    strict = !strict;
    console.log("Strict mode is now: " + strict);
  });
});
