// Generate random move Math.floor(Math.random()*4)

// Initial game state
var buttons = ['greenBtn','redBtn','yellowBtn','blueBtn'];
var sequence = [];
var counter = 0;
var gameActive = false;
var strict = false;
var winThreshold = 20;

// Illuminate the given button for 500ms and return to original state afterwards. Button is not interative for the duration.
function lightButton(selected) {
  $(selected).addClass('unclickable');
  
  var currColor = '';
  var lightColor = '';
  
  console.log(selected.id);

  switch (selected.id) {
    case 'greenBtn':
      currColor = 'green';
      lightColor = 'greenLight';
      break;
    case 'redBtn':
      currColor = 'red';
      lightColor = 'redLight';
      break;
    case 'yellowBtn':
      currColor = 'yellow';
      lightColor = 'yellowLight';
      break;
    case 'blueBtn':
      currColor = 'blue';
      lightColor = 'blueLight';
      break;
  }

  // Lighten the button
  $(selected).addClass(lightColor);

  // Note to self, 'this' within setTimeout refers to window by default, use a variable to store the correct 'this' and pass it!
  // var that = this;
  // Wait 500ms then return button to darkened state
  setTimeout(function() {
    $(selected).removeClass(lightColor).removeClass('unclickable');
    console.log("Removing lighter colors");
  }, 500);
  
  
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
    // Index 0 of the returned object is the actual DOM object we can play with...
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