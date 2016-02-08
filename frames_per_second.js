// Helps to calculate Frames Per Second in a game.
//
// Instance the class, and call drawn() every time
//	you draw a frame. You can call calculate() at any time
// to get the last frames per second drawn. If no data is
// available yet, you will receive 0
// 
var FramesPerSecond = function()
{
	this.currentFrames = 0;
	this.frames = 0;
	this.time = Date.now();
};

// Notifies that a frame has been drawn
FramesPerSecond.prototype.drawn = function()
{
	this.currentFrames++;
};

// Returns an integer notifying frames per second. Returns zero
// if no FPS can be calculated yet.
FramesPerSecond.prototype.calculate = function()
{
	var milliElapsed = Date.now() - this.time;
	if (milliElapsed > 1000)
	{
		this.time = Date.now();
		this.frames = this.currentFrames;
		this.currentFrames = 0;
	}

	return this.frames;
};