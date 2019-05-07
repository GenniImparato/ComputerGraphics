function move() 
{
	// Rotate 30 degrees around an arbitrary axis passing through (1,1,0). The x-axis can be aligned to the arbitrary axis after a rotation of 15 degrees around the z-axis, and then 45 degrees around the y-axis.
	
	//Translate by (1, 1, 0)
	var R1T = [1.0,		0.0,		0.0,		1.0,
			   0.0,		1.0,		0.0,		1.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Rotate by 45 on y
	var R1Y = [0.707,	0.0,		0.707,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   -0.707,	0.0,		0.707,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Scale by 15 on z
	var R1Z = [0.965,	-0.258,		0.0,		0.0,
			   0.258,	0.965,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Rotate 30 degrees on x
	var R1A = [1.0,		0.0,		0.0,		0.0,
			   0.0,		0.866,		-0.5,		0.0,
			   0.0,		0.5,		0.866,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var R1 = utils.multiplyMatrices(
		utils.multiplyMatrices(
			utils.multiplyMatrices(
				utils.multiplyMatrices(
					utils.multiplyMatrices(
						utils.multiplyMatrices(R1T, R1Y), R1Z), R1A), utils.invertMatrix(R1Z)), utils.invertMatrix(R1Y)), utils.invertMatrix(R1T));
			   
	// Double the size of an object, using as fixed point (1,1,0)

	//Translate by (1, 1, 0)
	var S1A = [1.0,		0.0,		0.0,		1.0,
			   0.0,		1.0,		0.0,		1.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Scale by 2
	var S1B = [2.0,		0.0,		0.0,		0.0,
			   0.0,		2.0,		0.0,		0.0,
			   0.0,		0.0,		2.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Transpose back 
	var S1C = [1.0,		0.0,		0.0,		-1.0,
			   0.0,		1.0,		0.0,		-1.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var S1 = utils.multiplyMatrices(utils.multiplyMatrices(S1A, S1B), S1C);
			   
	// Mirror the starship along a plane passing through (1,2,0), and obtained rotating 38 degree around the y axis the xy plane

	//Translate by (1, 2, 0)
	var S2T = [1.0,		0.0,		0.0,		1.0,
			   0.0,		1.0,		0.0,		2.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Rotate by 45 on y
	var S2Y = [0.788,	0.0,		0.615,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   -0.615,	0.0,		0.788,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Mirror
	var S2M = [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		-1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var S2 = utils.multiplyMatrices(
		utils.multiplyMatrices(
			utils.multiplyMatrices(
					utils.multiplyMatrices(S2T, S2Y), S2M), utils.invertMatrix(S2Y)), utils.invertMatrix(S2T));

	// The ship has been doubled in size, rotated 45 degrees around the x axis, 30 degrees around the y axis, and moved to (1,1,-2). Return the ship in its original position

	//Translate by (1, 1, -2)
	var I1T = [1.0,		0.0,		0.0,		1.0,
			   0.0,		1.0,		0.0,		1.0,
			   0.0,		0.0,		1.0,		-2.0,
			   0.0,		0.0,		0.0,		1.0];
	//Rotate by 30 on y
	var I1Y = [0.866,	0.0,		0.5,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   -0.5,	0.0,		0.866,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Scale by 45 on x
	var I1X = [1.0,		0.0,		0.0,		0.0,
			   0.0,		0.707,		-0.707,		0.0,
			   0.0,		0.707,		0.707,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	//Scale
	var I1S = [2.0,		0.0,		0.0,		0.0,
			   0.0,		2.0,		0.0,		0.0,
			   0.0,		0.0,		2.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var I1 = utils.multiplyMatrices(
				utils.multiplyMatrices(
						utils.multiplyMatrices(utils.invertMatrix(I1S), utils.invertMatrix(I1X)), utils.invertMatrix(I1Y)), utils.invertMatrix(I1T));

	return [R1, S1, S2, I1];
}

