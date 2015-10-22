# Ladri
A minimalistic Javascript / HTML5 arkanoid clone that runs on your browser. It does not
use bitmaps, just vector drawing and colors.

![Screenshot](/doc/screenshot.jpg?raw=true "Isn't it cute?")

# Nice features

* 100% pure HTML/JS. Runs on your browser, supplied by your filesystem.
* Keyboard support
* Mouse support
* Touch screen support (try it from your phone or tablet)
* Game scales to any possible screen resolution.
* Sound effects
* Levels and a simple level mapper to easily add new levels

# Why?
This is an exercise that i've prepared for giving a basic canvas HTML5 classroom session. It shows how easy is to use
HTML5 "primitives" to create simple games.

It is also a reference implementation for a simple HTML5 game framework called "Sacoa"

# How to play
Just pull the repository into a directory and open index.html using a browser. Simple! don't you just love HTML?
Use your keyboard, mouse or touch screen to move the pad.

# Other considerations

* Supports both timer and requestAnimationFrame (using a polyfill).

# Credits

* I'm using an awesome song for the intro created by Schematist (https://www.facebook.com/schematist). Allowed to use for non-commercial projects.

# Upcoming features

* Add options to the initial menu => initially I'd add "New game" and "Continue"
* Gime both choices requestAnimationFrame and timer by tweaking the class
* Add full screen mode
* Add more levels
* Fix the mouse clicking bug on the initial menu