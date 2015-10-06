// Brings support for making a game responsive for all game resolutions by
// translating all specified numbers to the real dimensions of the screen.
//
// Must supply the game, and the "ideal" width or height for the game. The
// height and width are the ideal dimensions that the programmer determines
// for this game. Then, all numbers to be translated must be supplied under
// those dimensions and this class translates them to the real dimensions
// of the screen.
//
// This is the "heavy", multi-purpose alternative to a responsive game.
// A much leaner, easier alternative is to just scale the canvas. Use
// ScreenScaler for that.
var ScreenTranslator = function(game, width, height)
{
	this.game = game;

	this.width = width;
	this.height = height;
};

ScreenTranslator.prototype.realWidth = function()
{
	return this.game.canvas.width;
};

ScreenTranslator.prototype.realHeight = function()
{
	return this.game.canvas.height;
};

// Returns the units for center of the screen on X. Useful for centering content.
// If a width is supplied (optional) then the position for the object
// to be centered is returned
ScreenTranslator.prototype.xCenter = function(width)
{
	if (width) width = this.translateX(width);
	return this.center(this.width(), width);
};

// Returns the units for center of the screen on Y. Useful for centering content.
// If a height is supplied (optional) then the position for the object
// to be centered is returned
ScreenTranslator.prototype.yCenter = function(height)
{
	if (height) width = this.translateY(height);
	return this.center(this.height(), height);
};

// Private. Used by xCenter and yCenter
ScreenTranslator.prototype.center = function(totalExtension, extension)
{
	if (!extension) extension = 0;
	return ((totalExtension - extension) / 2);
};

// Translates "ideal" pixels to "real" pixels on X
ScreenTranslator.prototype.translateX = function(pixelsX)
{
	return this.translate(this.width, this.realWidth(), pixelsX);
};

// Translates "ideal" pixels to "real" pixels on Y
ScreenTranslator.prototype.translateY = function(pixelsY)
{
	return this.translate(this.height, this.realHeight(), pixelsY);
};

// Private. To be used by translateX and translateY
ScreenTranslator.prototype.translate = function(virtualExtension, realExtension, pixels)
{
	// It uses a simple thirds rule
	// width      ________ pixelsX
	// realWidth  ________ X
	//
	// X = (realWidth * pixelsX) / width

	return ((realExtension * pixels) / virtualExtension);
};