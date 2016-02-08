// Given the native resolution for the game, it returns the "scaled" dimensions
// for the present resolution so the framework can scale the canvas.
var ScreenScaler = 
{
	scale: function(game)
	{
		var canvas = game.canvas;
		var width = canvas.width;
		var height = canvas.height;

		var realWidth = window.innerWidth - 10;
		var realHeight = window.innerHeight - 10;

		var proportionalWidth;
		var proportionalHeight;
		// Using rule of three to calculate a new height for the width
		//
		// width ____________ height
		// realWidth ________ X
		if ((realWidth - 250) > realHeight)
		{
			// Lock height
			proportionalHeight = realHeight;
			proportionalWidth = ((realHeight * width) / height);
		}
		else
		{
			// Lock width
			proportionalWidth = realWidth;
			proportionalHeight = ((realWidth * height) / width);
		}

		return { width: proportionalWidth, height: proportionalHeight};
	}
};