# Sacoa

A basic 2D game framework for creating HTML5 / CSS3 / Javascript games. It holds
a number of javascript prototypes that can be extended to implement our
own game "classes".

## Reference

### Base class for a game

Implement the game.js prototype to create your game. It gives you a structure
to manage the basic game loop, drawing and other goodies.

### Actors

Actors are the old well-known sprites in 2D games. Sprites can collide with other
sprites. Examples are: your character, your enemies, things you have to shot, etc.
Actors know how to draw themselves, detect collisions, etc.

### Controlling the game

The framework helps you to control the game using the keyboard (keyboard.js), 
mouse (mouse.js) and touchscreens (touch.js). Control is high definition (i.e. not
events, but game-loop base controlling).

### Audio

Use the audio_library.js prototype to play sounds and music

### Other goodies

* Create intro menues using menu.js and menu_option.js so the player can configure the game
* Show frames per second onscreen using frames_per_second.js
* Scale your game to any resolution using screen_scaler.js
* Animate both using a timer and requestAnimationFrame depending on your convenience

## How to use

Just add it as a submodule or a subtree (subtree should be enough) to your src folder

## Implementation references

* Ladri: https://github.com/diegoesp/ladri