function onload()
{
	var canvas = document.getElementById("ladriCanvas");	

	var game = new Game(canvas);
	game.startLoop();
}