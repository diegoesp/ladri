// Use the ball to bust bricks!
var Ball = function()
{
	this.reset();
};

// Ball inherits from Actor
Ball.prototype = Object.create(Actor.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.reset = function()
{
	this.x = 380;
	this.y = 480;
	this.speedX = -1.5;
	this.speedY = -1.5;
};

Ball.prototype.draw = function(context)
{
	var radius = 7.5;
	var initialAngle = 0;
	var finalAngle = Math.PI * 2;
	var antiClockwise = true;

	context.beginPath();
	context.arc(this.x, this.y, radius, initialAngle, finalAngle, antiClockwise);
	context.closePath();
	context.fill();

	// All actors ahve width and height for collision calculations
	this.width = 15;
	this.height = 15;
};

// Moves the ball by its present speed. Should be called inside the game loop
Ball.prototype.move = function()
{
	this.x += this.speedX;
	this.y += this.speedY;
};