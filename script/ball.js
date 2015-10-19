// Use the ball to bust bricks!
var Ball = function(game)
{
	this.reset();

	this.game = game;
};

// Ball inherits from Actor
Ball.prototype = Object.create(Actor.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.reset = function()
{
	this.x = 380;
	this.y = 480;
	this.speedX = -3.5;
	this.speedY = -3.5;
};

Ball.prototype.draw = function()
{
	var radius = 7.5;
	var initialAngle = 0;
	var finalAngle = Math.PI * 2;
	var antiClockwise = true;

	var context = this.game.context();

	context.beginPath();
	context.arc(this.x, this.y, radius, initialAngle, finalAngle, antiClockwise);
	context.closePath();
	context.fill();

	// All actors have width and height for collision calculations
	this.width = 15;
	this.height = 15;
};

// Moves the ball by its present speed. Should be called inside the game loop
Ball.prototype.move = function()
{
	this.x += this.speedX;
	this.y += this.speedY;
};

// Increments the speed on the ball adding the parameter to current speed.
Ball.prototype.incrementSpeed = function(speed)
{
	// Keep the direction (determined by the sign of the number)
	var signX = Math.sign(this.speedX);
	var signY = Math.sign(this.speedY);

	// Add speed in absolute value
	this.speedX = Math.abs(this.speedX) + Math.abs(speed);
	this.speedY = Math.abs(this.speedY) + Math.abs(speed);

	// Get back the direction
	this.speedX *= signX;
	this.speedY *= signY;
};

// Sets  the speed on the ball adding the parameter to current speed
Ball.prototype.setSpeed = function(speed)
{
	// Add speed in absolute value
	this.speedX = speed;
	this.speedY = speed;
}