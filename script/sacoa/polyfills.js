// This file automatically provides many polyfills for HTML5 game programming. 
// Include it in your include path
//

(function() 
{
	// Attaches window.requestAnimationFrame to the concrete implementation
	// for the present browser
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) 
	{
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame =
		window[vendors[x] + 'CancelAnimationFrame'] ||
		window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	 
	// If no implementation was found, then a custom implementation is made using timers
	if (!window.requestAnimationFrame)
	{
		window.requestAnimationFrame = function(callback, element) 
		{
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}());