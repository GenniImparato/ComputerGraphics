function axonometry() 
{
	// Make an isometric view, w = 40, a = 16/9, n = 1, f = 101.

	//Parallel projection matrix
	var A1P =  [0.025,	0.0,		0.0,		0.0,
			   0.0,		0.044,		0.0,		0.0,
			   0.0,		0.0,		-0.02,		-1.02,
			   0.0,		0.0,		0.0,		1.0];

	//Rotation on x of 35.26°
	var A1X =  [1.0,	0.0,		0.0,		0.0,
			   0.0,		0.816,		0.577,		0.0,
			   0.0,		-0.577,		0.816,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	//Rotation on y of 45°
	var A1Y =  [0.707,	0.0,		-0.707,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.707,	0.0,		0.707,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var A1 = utils.multiplyMatrices(
		utils.multiplyMatrices(A1P, A1X), A1Y);
	//------------------------------------------------------------
			   
	// Make a dimetric view, w = 40, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
	//Parallel projection matrix
	var A2P =  [0.025,	0.0,		0.0,		0.0,
			   0.0,		0.044,		0.0,		0.0,
			   0.0,		0.0,		-0.02,		-1.02,
			   0.0,		0.0,		0.0,		1.0];

	//Rotation on x of 20°
	var A2X =  [1.0,	0.0,		0.0,		0.0,
			   0.0,		0.939,		0.342,		0.0,
			   0.0,		-0.342,		0.939,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	//Rotation on y of 45°
	var A2Y =  [0.707,	0.0,		-0.707,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.707,	0.0,		0.707,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var A2 = utils.multiplyMatrices(
		utils.multiplyMatrices(A2P, A2X), A2Y);
			   
	// Make a trimetric view, w = 40, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
	//Parallel projection matrix
	var A3P =  [0.025,	0.0,		0.0,		0.0,
			   0.0,		0.044,		0.0,		0.0,
			   0.0,		0.0,		-0.02,		-1.02,
			   0.0,		0.0,		0.0,		1.0];

	//Rotation on x of -30°
	var A3X =  [1.0,	0.0,		0.0,		0.0,
			   0.0,		0.866,		-0.5,		0.0,
			   0.0,		0.5,		0.866,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	//Rotation on y of 30°
	var A3Y =  [0.866,	0.0,		-0.5,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.5,		0.0,		0.866,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var A3 = utils.multiplyMatrices(
		utils.multiplyMatrices(A3P, A3X), A3Y);
			   
	// Make an cavalier projection view, w = 40, a = 16/9, n = 1, f = 101, at 45 degrees
	//Parallel projection matrix
	var O1P =  [0.025,	0.0,		0.0,		0.0,
			   0.0,		0.044,		0.0,		0.0,
			   0.0,		0.0,		-0.02,		-1.02,
			   0.0,		0.0,		0.0,		1.0];

	//Shear
	var O1S =  [1.0,	0.0,		-0.707,		0.0,
			   0.0,		1.0,		-0.707,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var O1 = utils.multiplyMatrices(O1P, O1S);

	// Make a cabinet projection view, w = 40, a = 16/9, n = 1, f = 101, at 60 degrees
	//Parallel projection matrix
	var O2P =  [0.025,	0.0,		0.0,		0.0,
			   0.0,		0.044,		0.0,		0.0,
			   0.0,		0.0,		-0.02,		-1.02,
			   0.0,		0.0,		0.0,		1.0];

	//Shear
	var O2S =  [1.0,	0.0,		-0.25,		0.0,
			   0.0,		1.0,		-0.433,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var O2 = utils.multiplyMatrices(O2P, O2S);

	return [A1, A2, A3, O1, O2];
}

