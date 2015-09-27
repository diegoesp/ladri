// Our hero!! The pad that hits the ball
var Pad = function()
{
	this.x = 320;
	this.y = 530;
	this.width = 150;
	this.height = 20;
	this.speedX = 15;
}

// Pad inherits from Actor
Pad.prototype = Object.create(Actor.prototype);
Pad.prototype.constructor = Pad;

Pad.prototype.draw = function(context)
{
	context.fillStyle = "black";
	context.fillRect(this.x, this.y, this.width, this.height);
}

Pad.prototype.handleKeyboard = function(event, game)
{
	if (event.keyCode === KeyCode.cursorLeft) this.x -= this.speedX;
	if (event.keyCode === KeyCode.cursorRight) this.x += this.speedX;

	// The pad must not go out of the screen
	if (this.x < 0) this.x = 0;
	if (this.xWidth() > game.width()) this.x = (game.width() - this.width);
}
