// Handles mouse events so we can use the mouse to guide characters
var Mouse = function()
{
	this.map = {
		x: 0,
		y: 0,
		left: false,
		right: false
	};
};

Mouse.prototype.mouseMove = function(event)
{
	var diff = event.clientX - this.map.x;

	if (diff < 0) this.map.left = true;
	if (diff > 0) this.map.right = true;

	this.map.x = event.clientX;
	this.map.y = event.clientY;
};

// Gets the mouse map movement. Do not call more than once per cycle,
// as it is a costly call and it also resets state so movement is not
// constant (otherwise, it would be umconfortable for the player)
Mouse.prototype.mouseMap = function()
{
	var clonedMap = {};
	var map = this.map;

	Object.keys(map).forEach(function(key) 
	{
  	clonedMap[key] = map[key];
	}); 

	this.map.left = false;
	this.map.right = false;

	return clonedMap;
};