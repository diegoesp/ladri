// Abstract class for implementing Actors in the game
//
// instance variables:
//
// x: holds the X position in screen
// y: holds the Y position in screen
var Actor = function()
{
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
};

// Checks if this actor is in collision with other actors in the game. It returns
// an array with the list of collisions. If the array is empty, there's no collisions.
//
// A collision is a hash with the following structure:
//
// collision = {
//   actor: the actor that collisioned with this actor
//   x: boolean, if true then the collision is on direction X. Useful if the object must bounce.
//	 y: boolean, if true then the collision is on direction Y. Useful if the object must bounce.
// }
Actor.prototype.collisions = function(game)
{
	var actors = game.actors;

	var collisions = [];

	for (var i = 0; i < actors.length; i++)
	{
		var actor = actors[i];
		// Avoid a collision with myself :)
		if (actor !== this)
		{
			var collidesWith = this.collidesWith(actor);

			if (collidesWith.collision)
			{
				collision = {
					actor: actor,
					x: collidesWith.collisionX,
					y: collidesWith.collisionY
				};
				
				collisions.push(collision);
			}
		}
	}

	return collisions;
};


// Box-based collision algorithm. Based on 4 different
// possible collisions: up, right, bottom, and left.
//
// Returns a hash with three elements: collision, collisionX and collisionY:
//
// collision: boolean, if true a collision happened
// collisionX: boolean, if true then the collision is on direction X. Useful if the object must bounce.
// collisionY: boolean, if true then the collision is on direction Y. Useful if the object must bounce.
//
Actor.prototype.collidesWith = function(actor)
{
	var collisionX = false;
	var collisionY = false;

	// Four possible cases

	// Case 1
	// Collision from the upper part
	if (this.x >= actor.x && this.x <= actor.xWidth())
		if (this.yHeight() >= actor.y && this.yHeight() <= actor.yHeight())
			collisionY = true;

		// Case 2
		// Collision from the right
		if (this.y >= actor.y && this.yHeight() <= actor.yHeight())
			if (this.x >= actor.x && this.x <= actor.xWidth())
				collisionX = true;

		// Case 3
		// Collsion from the bottom
		if (this.x >= actor.x && this.x <= actor.xWidth())
			if (this.y >= actor.y && this.y <= actor.yHeight())
				collisionY = true;

		// Case 4
		// Collision from the left
		if (this.y >= actor.y && this.yHeight() <= actor.yHeight())
			if (this.xWidth() >= actor.x && this.xWidth() <= actor.xWidth())
				collisionX = true;

		return { collision: (collisionX || collisionY), collisionX: collisionX, collisionY: collisionY };
};

Actor.prototype.xWidth = function()
{
	return (this.x + this.width);
};

Actor.prototype.yHeight = function()
{
	return (this.y + this.height);
};

// Checks if this actor is touching one of the screens edge. Returns a boolean.
Actor.prototype.isAtScreenEdgeX = function(game)
{
	if (this.x <= 0) return true;
	if (this.x >= game.width()) return true;

	return false;
};

Actor.prototype.isAtScreenEdgeY = function(game)
{
	if (this.y <= 0) return true;	
	return this.isAtScreenBottom(game);
};

// Checks if the user is touching the bottom of the screen. Returns a boolean
Actor.prototype.isAtScreenBottom = function(game)
{
	if (this.y >= game.height()) return true;
	return false;
};