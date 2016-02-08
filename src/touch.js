// Handles touch screen events so we can use touch to guide characters
var Touch = function()
{
	Mouse.call(this);
};

// Pad inherits from Actor
Touch.prototype = Object.create(Mouse.prototype);
Touch.prototype.constructor = Touch;

Touch.prototype.getCoordinates = function(event)
{
	event.preventDefault();
	
	var touch = event.touches[0];
	return { clientX: touch.clientX, clientY: touch.clientY };
};