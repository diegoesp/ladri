// Represents a menu option
var MenuOption = function(text, x, y, game)
{
	this.x = x;
	this.y = y;
	this.width = (text.length * 15);
	this.height = 25;

	this.text = text;
	this.game = game;
	this.status = MenuOption.NORMAL;
};

MenuOption.STATUS = { NORMAL: 0, HIGHLIGHTED: 1, DISABLED: 2 };

// MenuOption inherits from Actor
MenuOption.prototype = Object.create(Actor.prototype);
MenuOption.prototype.constructor = MenuOption;

MenuOption.prototype.setStatus = function(status)
{
	this.status = status;
};

// Draws the text. Styles is an optional hash parameter, specifying:
//
// highlight: if true, then the option is highlighted (typically for selection)
// disabled: if true, then the option is disabled
MenuOption.prototype.draw = function()
{
	var context = this.game.context();

	context.font = "20pt rodusround";
	
	if (this.status === MenuOption.STATUS.DISABLED)
	{
		context.fillStyle = "rgb(128, 128, 128)";
	}
	else
	{
		context.fillStyle = "rgb(255, 255, 255)";
	}

	this.width = context.measureText(this.text).width;
	context.fillText(this.text, this.x, this.y);
	
	if (this.status === MenuOption.STATUS.HIGHLIGHTED) 
	{
		context.fillText(this.text, this.x + 1.0, this.y + 1.0);
	}
};

MenuOption.prototype.isSelected = function()
{
	if (this.status === MenuOption.STATUS.HIGHLIGHTED) return true;
	return false;
};