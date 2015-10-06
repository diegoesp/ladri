// Handles keyboard events using a common game programming pattern, a keyboard
// status table, instead of using an event oriented model. The even oriented
// model is OS dependent and have known issues for games (like stroke-delaying,
// or slow response) that is crucial for these type of applications. 
var Keyboard = function()
{
	this.codes = {
		cursorLeft: 37,
		cursorUp: 38,
		cursorRight: 39,
		cursorDown: 40
	};

	this.map = {
		cursorLeft: false,
		cursorRight: false
	};
};

Keyboard.prototype.keyUp = function(event)
{
	if (event.keyCode === this.codes.cursorLeft) this.map.cursorLeft = false;
	if (event.keyCode === this.codes.cursorRight) this.map.cursorRight = false;
};

Keyboard.prototype.keyDown = function()
{
	if (event.keyCode === this.codes.cursorLeft) this.map.cursorLeft = true;
	if (event.keyCode === this.codes.cursorRight) this.map.cursorRight = true;
};

Keyboard.prototype.keyMap = function()
{
	return this.map;
};