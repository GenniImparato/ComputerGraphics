function draw() {
	// line(x1,y1, x2,y2)
	// draws a line from a point at Normalized screen coordinates x1,y1 to Normalized screen coordinates x2,y2
	line(0.5, 0.5, 0.0, 0.8);
	line(0.0, 0.8,-0.5, 0.5);
	line(-0.5, 0.5, -0.5, -0.7);
	line(-0.5, -0.7, 0.5, -0.7);
	line(0.5, -0.7, 0.5, 0.5);
	line(0.2, -0.7, 0.2, -0.1);
	line(-0.2, -0.1, 0.2, -0.1);
	line(-0.2, -0.1, -0.2, -0.7);
    // windows
    line(-0.2, 0.1, -0.4, 0.1);
    line(-0.2, 0.3, -0.4, 0.3);
    line(-0.2, 0.1, -0.2, 0.3);
    line(-0.4, 0.1, -0.4, 0.3);

    line(0.2, 0.1, 0.4, 0.1);
    line(0.2, 0.3, 0.4, 0.3);
    line(0.2, 0.1, 0.2, 0.3);
    line(0.4, 0.1, 0.4, 0.3);
}

