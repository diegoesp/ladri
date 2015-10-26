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
		cursorDown: 40,
		enter: 13
	};

	this.map = {
		cursorLeft: false,
		cursorRight: false,
		cursorUp: false,
		cursorDown: false,
		enter: false
	};
};

Keyboard.prototype.keyUp = function(event)
{
	this.fillKeyMap(false);
};

Keyboard.prototype.keyDown = function()
{
	this.fillKeyMap(true);
};

// Private
Keyboard.prototype.fillKeyMap = function(keyPressed)
{
	// This code does what is written below but iterating through keys so we do
	// not need to extend it every time we add a new key to be considered
	//
	// if (event.keyCode === this.codes.cursorLeft) this.map.cursorLeft = true (or false);
	var keyNames = Object.keys(this.codes);
	for (var i = 0; i < keyNames.length; i++)
	{
		var keyName = keyNames[i];
		var keyCode = this.codes[keyName];
		if (event.keyCode === keyCode)
		{
			this.map[keyName] = keyPressed;
		}
	}
};

Keyboard.prototype.keyMap = function()
{
	return this.map;
};