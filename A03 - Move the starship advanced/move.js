function move() {
	// Rotate 30 degrees around an arbitrary axis passing through (1,1,0). The x-axis can be aligned to the arbitrary axis after a rotation of 15 degrees around the z-axis, and then 45 degrees around the y-axis.
    var R1 =  utils.multiplyMatrices(
	utils.MakeTranslateMatrix(1,1,0),
	utils.multiplyMatrices(
	    utils.MakeRotateZMatrix(15),
	    utils.multiplyMatrices(
		utils.MakeRotateYMatrix(45),
		utils.multiplyMatrices(
		    utils.MakeRotateXMatrix(30),
		    utils.multiplyMatrices(
			utils.invertMatrix(utils.MakeRotateYMatrix(45)),
			utils.multiplyMatrices(
			    utils.invertMatrix(utils.MakeRotateZMatrix(15)),
			    utils.invertMatrix(utils.MakeTranslateMatrix(1,1,0))))))));  
	// Double the size of an object, using as fixed point (1,1,0)
    var S1 =  utils.multiplyMatrices(
	utils.MakeTranslateMatrix(1,1,0),
	utils.multiplyMatrices(
	    utils.MakeScaleMatrix(2),
	    utils.invertMatrix(utils.MakeTranslateMatrix(1,1,0))
	)
    );
	// Mirror the starship along a plane passing through (1,2,0), and obtained rotating 38 degree around the y axis the xy plane
    var S2 =	utils.multiplyMatrices(
	utils.MakeTranslateMatrix(1,2,0),
	utils.multiplyMatrices(
	    utils.MakeRotateYMatrix(38),
	    utils.multiplyMatrices(
		utils.MakeScaleNuMatrix(1,1,-1),
		utils.multiplyMatrices(
		    utils.invertMatrix(utils.MakeRotateYMatrix(38)),
		    utils.invertMatrix(utils.MakeTranslateMatrix(1,2,0))
		)
	    )
	)
    );		   
	// The ship has been doubled in size, rotated 45 degrees around the x axis, 30 degrees around the y axis, and moved to (1,1,-2). Return the ship in its original position
    var I1 =  utils.invertMatrix(
	utils.multiplyMatrices(
	    utils.MakeTranslateMatrix(1,1,-2),
	    utils.multiplyMatrices(
		utils.MakeRotateYMatrix(30),
		utils.multiplyMatrices(
		    utils.MakeRotateXMatrix(45),
		    utils.MakeScaleMatrix(2)
		)
	    )
	)
    );

	return [R1, S1, S2, I1];
}

