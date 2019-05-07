function move() {
	// Translate of +3 on the x axis, and -5 on the z axis
    var T1 = utils.MakeTranslateMatrix(3,0,-5);
			   
	// Rotate of 30 degrees on the y axis
    var R1 = utils.MakeRotateYMatrix(30); 
			   
	// Make the starship 2 times bigger
    var S1 = utils.MakeScaleMatrix(2);
			   
	// Make the starship 1.5 times longer on the x axis, and half on the other axis
    var S2 = utils.MakeScaleNuMatrix(1.5, 0.5, 0.5 ); 

	// Mirror over the yz plane
    var S3 = utils.MakeScaleNuMatrix(-1,1,1);
			   
	// Flatten over the zx plane
    var S4 =  utils.MakeScaleNuMatrix(1,0,0);

	// Make a shear along the x axis, with a factor of 1 along the y axis
    var H1 =  utils.MakeShearXMatrix(1,0);

	return [T1, R1, S1, S2, S3, S4, H1];
}

