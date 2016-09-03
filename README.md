# Simon Says Game - FreeCodeCamp Project---## 1. What This Project DoesThe purpose of this app is to provide the user with a simple Pomodoro Timer, a productivity tool with the intent of working for 25 minutes at a time, broken up by 5 minute breaks before the next Pomodoro begins. Through building this app I got exposure to the JavaScript built-in Date and Math objects, and how to create and control timed actions using setInterval() and callbacks.The user stories for this project are:* The user is presented with a random series of button presses.* Each time I input a series of button presses correctly, the user sees the same series of button presses but with an additional step.* The user hears a sound that corresponds to each button both when the series of button presses plays, and when they personally press a button.* If the user presses the wrong button, they are notified that they have done so, and that series of button presses starts again to remind them of the pattern so they can try again.* The user can see how many steps are in the current series of button presses.* If the user want to restart, they can hit a button to do so, and the game will return to a single step.* The user can play in strict mode where if they get a button press wrong, it notifies them that they have done so, and the game restarts at a new random series of button presses.* The user can win the game by getting a series of 20 steps correct. They are notified of their victory, and can start another game.* Use any libraries or APIs needed, and give it your own personal style.The originally submitted version of the app fulfilled all user stories, and the various iterations since then have been improvements either in styling or in making the code more succinct.## 2. How To Set This UpIf you want to clone this project for yourself, the process is very simple due to the structure of the project.1. Either manually download and unzip files to a location, or clone this repo through Git.2. Open the index.html file in your browser. This project is built on HTML5/CSS3/JavaScript/jQuery and the necessary resources from Bootstrap and FontAwesome are linked through the HTML file, so there is no need to install any packages through NPM.## 3. Project GoalsAs one of my early web development projects, this was a chance for me to:* Continue working with HTML/CSS and using Bootstrap for styling and creating a crisp, visually appealing user experience.* Practice using jQuery to monitor divs and buttons for clicks and apply appropriate responses to the DOM.* Use the random object to create random game sequences in response to the user.* Get more exposure to creating state control logic for games and apps.* Get deeper experience create delayed/timed effects using the setInterval function in sequences and nesting the intervals.* Learn how to play audio to the browser at certain times.* Look for opportunities to use special JavaScript functions like .map, .every, etc to make code more pure and declarative vs imperative.* Continue producing well-documented code with repetitive functionality factored out into specific functions that minimize redundancy, keep code short, and increase readability/maintainability.Now that I'm coming back and reviewing past projects (such as this one), my new goals in addition to supporting the previous ones are:* Redesign the app to fit into my growing design language/styling through color, layout, animations, and reduction of unnecessary elements* Refactor any redundancies in my JavaScript and make old code compliant with current linters (such as AirBnB's standards)## 4. Link to Live SiteThe latest version of the site can be viewed [here](https://stern-shawn.github.io/FCC-Simon/) thanks to gh-pages hosting.## 5. RoadmapTODO:* ~~Establish initial template in plain HTML/CSS, including the buttons the user plays with as well as the start and strict mode buttons~~* ~~Apply Bootstrap styling to make the app more responsive on mobile devices and when the desktop window is resized~~* ~~Figure out styling and use of setInterval to make the game buttons light up and return to their 'dimmed' state after being clicked~~* ~~Integrate sounds to the button presses~~* ~~Make it so buttons can only be interacted with once a game has started, but not when the game is showing the user a sequence~~* ~~Enable the game to light up and play sounds for the randomly generated sequences so the user has a pattern to follow~~* ~~Determine logic and variables necessary to track the players progress through the game, if they make mistakes, and if they have won. Figure out what to do on each user's click (have they won? Are they at the end of a sequence and need a new move? Did they just make a mistake? Etc.)~~* ~~Implement strict mode behavior and button styling~~* ~~Attempt to solve audio latency on mobile by pre-loading audio files~~* Restyle app?* Add victory animations instead of just an alert?