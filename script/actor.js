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
}

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
			// Very simple and basic box-based collision algorithm. Based on 8 different
			// possible collisions: upper-left, up, upper-right, right,
			// bottom-right, down, bottom-left and left.

			var collisionX = false;
			var collisionY = false;

			// All "uppers" have to validate if Y has been touched from the up-side and...
			// All "bottoms" have to validate if Y has been touched from the downside
			if ((this.y <= actor.y && this.yHeight() >= actor.y) || (this.y <= actor.yHeight() && this.yHeight() >= actor.yHeight()))
			{
				// Possibility of upper or bottom collision

				// Upper-left
				if (this.x <= actor.x && this.xWidth() >= actor.x) collisionY = true;
				// Up
				if (this.x >= actor.x && this.xWidth() <= actor.xWidth()) collisionY = true;
				// Upper-right
				if (this.x <= actor.xWidth() && this.xWidth() >= actor.yHeight()) collisionY = true;
			}

			// We only have two cases to check: right collision, or left collision. Those
			// two have to validate if the object is vertically included in the other object
			if (this.y >= actor.y && this.yHeight() <= actor.yHeight())
			{
				// Possibility of left or right collision

				// Right collision
				if (this.y >= actor.y && this.yHeight <= actor.yHeight())
					collisionX = true;

				// Left collision
				if (this.x <= actor.x && this.xWidth >= actor.x)				
						collisionX = true;
			}

			if (collisionX || collisionY) 
			{
				collision = {
					actor: actor,
					x: collisionX,
					y: collisionY
				}
				
				collisions.push(collision);
			}
		}
	}

	return collisions;
}

Actor.prototype.xWidth = function()
{
	return (this.x + this.width);
}

Actor.prototype.yHeight = function()
{
	return (this.y + this.height);
}

// Checks if this actor is touhing one of the screens edge. Returns a boolean.
Actor.prototype.isAtScreenEdgeX = function(game)
{
	if (this.x <= 0) return true;
	if (this.x >= game.width()) return true;

	return false;
}

Actor.prototype.isAtScreenEdgeY = function(game)
{
	if (this.y <= 0) return true;
	if (this.y >= game.height()) return true;

	return false;
}