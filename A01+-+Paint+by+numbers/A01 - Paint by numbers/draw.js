function drawWindow(x, y)
{
	line(x, y, x+0.2, y);
	line(x+0.2, y, x+0.2, y-0.3);
	line(x+0.2, y-0.3, x, y-0.3);
	line(x, y-0.3, x, y);
}

function draw() 
{
	//draw house
	line(-0.5, -0.7, -0.5, 0.5);
	line(-0.5, 0.5, 0, 0.8);
	line(0, 0.8, 0.5, 0.5);
	line(0.5, 0.5, 0.5, -0.7);
	line(0.5, -0.7, -0.5, -0.7);

	//draw door
	line(-0.1, -0.7, 0.1, -0.7);
	line(0.1, -0.7, 0.1, -0.1);
	line(0.1, -0.1, -0.1, -0.1);
	line(-0.1, -0.1, -0.1, -0.7);

	//draw windows
	drawWindow(-0.3, 0.5);
	drawWindow(0.1, 0.5);

}

