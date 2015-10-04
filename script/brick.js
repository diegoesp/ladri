// A new brick for the player to bust! must specify x position,
// y position and color (rgb)
var Brick = function(x, y, color)
{
	this.x = x;
	this.y = y;
	this.width = 75;
	this.height = 20;
	this.color = color;
};

// Brick inherits from Actor
Brick.prototype = Object.create(Actor.prototype);
Brick.prototype.constructor = Brick;

// Static method that returns an array with possible colors for the brick
Brick.colors = function()
{
	var colors = [];
	
	colors.push("rgb(255, 000, 000)");	// red
	colors.push("rgb(255, 128, 000)");	// orange
	colors.push("rgb(255, 255, 000)");	// yellow
	colors.push("rgb(255, 128, 000)");	// orange
	colors.push("rgb(000, 255, 000)");	// green
	colors.push("rgb(255, 128, 000)");	// orange
	colors.push("rgb(000, 255, 255)");	// cyan
	colors.push("rgb(000, 128, 255)");	// light blue
	colors.push("rgb(000, 000, 255)");	// blue
	colors.push("rgb(127, 000, 255)");	// purple
	colors.push("rgb(255, 000, 255)");	// violet
	colors.push("rgb(255, 000, 127)");	// ruby
	colors.push("rgb(127, 127, 127)");	// grey

	return colors;
};

Brick.prototype.draw = function(context)
{
	context.fillStyle = this.color;
	context.fillRect(this.x, this.y, this.width, this.height);
};