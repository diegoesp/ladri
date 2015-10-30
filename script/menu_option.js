// Represents a menu option
var MenuOption = function(text, x, y, callback)
{
	this.x = x;
	this.y = y;
	this.width = (text.length * 15);
	this.height = 25;
	this.callback = callback;

	this.text = text;
	this.state = MenuOption.STATE.NORMAL;
};

MenuOption.STATE = { NORMAL: "NORMAL", HIGHLIGHTED: "HIGHLIGHTED", DISABLED: "DISABLED" };

// MenuOption inherits from Actor
MenuOption.prototype = Object.create(Actor.prototype);
MenuOption.prototype.constructor = MenuOption;

// Sets the state of the menu option based on MenuOption.STATE
MenuOption.prototype.setState = function(state)
{
	this.state = state;
};

// Gets the menu state, one of the values of MenuOption.STATE
MenuOption.prototype.getState = function()
{
	return this.state;
};

// Draws the text. Styles is an optional hash parameter, specifying:
// highlight: if true, then the option is highlighted (typically for selection)
// disabled: if true, then the option is disabled
MenuOption.prototype.draw = function(context)
{
	context.font = "20pt rodusround";
	
	if (this.state === MenuOption.STATE.DISABLED)
	{
		context.fillStyle = "rgb(128, 128, 128)";
	}
	else
	{
		context.fillStyle = "rgb(255, 255, 255)";
	}

	this.width = context.measureText(this.text).width;
	context.fillText(this.text, this.x, this.y);
	
	if (this.state === MenuOption.STATE.HIGHLIGHTED) 
	{
		context.fillText(this.text, this.x + 1.0, this.y + 1.0);
	}
};

// Determines if the menu option is highlighted
MenuOption.prototype.isHighlighted = function()
{
	if (this.state === MenuOption.STATE.HIGHLIGHTED) return true;
	return false;
};

// Executes the assigned callback for the menu option
MenuOption.prototype.execute = function(game)
{
	this.callback(game);
};