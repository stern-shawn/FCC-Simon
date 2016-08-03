// Generate random move Math.floor(Math.random()*4)

// Initial game state
var buttons = ['greenBtn','redBtn','yellowBtn','blueBtn'];
var sequence = [];
var counter = 0;
var gameActive = false;
var strict = false;
var winThreshold = 20;

// Illuminate the given button for 500ms and return to original state
// afterwards. Button is not interative for the duration.
// Input is expected to be the DOM object for a simonButton
function lightButton(selected) {
  $(selected).addClass('unclickable');

  var currColor = '';
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

$(document).ready(function() {
  $('#start').click(function() {
    $('#start').addClass('unclickable');
    // Reset game
    sequence = [];

    // Generate and do first move steps
    var firstMove = Math.floor(Math.random()*4);
    console.log("Starting game at index: " + firstMove);
    // Put this first value in the sequence
    sequence.push(firstMove);
    // Show the first move visibly to the user
    // console.log(buttons[firstMove]);
    var firstButton = $('#' + buttons[firstMove]);
    // Index 0 of the returned object is the actual DOM object
    // console.log(firstButton[0]);
    lightButton(firstButton[0]);

    $('#count').html(sequence.length);

    setTimeout(function() {
      $('#start').removeClass('unclickable');
    }, 500);
  });

  $('.simonButton').click(function() {
    console.log(this);
    lightButton(this);
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
});
