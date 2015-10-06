// Handles mouse events so we can use the mouse to guide characters
var Mouse = function()
{
	this.movementMap = {
		x: 0,
		y: 0,
		left: false,
		right: false
	};
};

Mouse.prototype.getCoordinates = function(event)
{
	return { clientX: event.clientX, clientY: event.clientY };
};

Mouse.prototype.move = function(event)
{
	var coordinates = this.getCoordinates(event);
	var diff = coordinates.clientX - this.movementMap.x;

	if (diff < 0) this.movementMap.left = true;
	if (diff > 0) this.movementMap.right = true;

	this.movementMap.x = coordinates.clientX;
	this.movementMap.y = coordinates.clientY;
};

// Gets the mouse map movement. Do not call more than once per cycle,
// as it is a costly call and it also resets state so movement is not
// constant (otherwise, it would be umconfortable for the player)
Mouse.prototype.map = function()
{
	var clonedMap = {};
	var map = this.movementMap;

	Object.keys(map).forEach(function(key) 
	{
  	clonedMap[key] = map[key];
	}); 

	map.left = false;
	map.right = false;

	return clonedMap;
};