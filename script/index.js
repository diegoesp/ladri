function onload()
{
	var canvas = document.getElementById("ladriCanvas");	

	var ladriGame = new LadriGame(canvas);
	ladriGame.startLoop();
}