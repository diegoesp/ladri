function onload()
{
	var canvas = document.getElementById("ladriCanvas");	

	var menuGame = new MenuGame(canvas);
	menuGame.startLoop();
}