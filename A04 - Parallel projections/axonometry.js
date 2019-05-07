function axonometry() {
	// Make an isometric view, w = 40, a = 16/9, n = 1, f = 101.
    var A1 =  utils.multiplyMatrices([1/40,	0.0,		0.0,		0.0,
				      0.0,		(16/9)/40,		0.0,		0.0,
				      0.0,		0.0,		-2/(100),		-(102)/100,
				      0.0,		0.0,		0.0,		1.0],
				     utils.multiplyMatrices(
					 utils.MakeRotateXMatrix(35.26),
					 utils.MakeRotateYMatrix(45)
				     )
				    ) ;
			   
	// Make a dimetric view, w = 40, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
    var A2 = utils.multiplyMatrices([1/40,	0.0,		0.0,		0.0,
		  0.0,		(16/9)/40,		0.0,		0.0,
		  0.0,		0.0,		-2/(100),		-(102)/100,
				     0.0,		0.0,		0.0,		1.0],
				    utils.multiplyMatrices(
					utils.MakeRotateXMatrix(20),
					utils.MakeRotateYMatrix(45)
					
				    )) ;
			   
	// Make a trimetric view, w = 40, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
    var A3 =  utils.multiplyMatrices([1/40,	0.0,		0.0,		0.0,
				      0.0,		(16/9)/40,		0.0,		0.0,
				      0.0,		0.0,		-2/(100),		-(102)/100,
				      0.0,		0.0,		0.0,		1.0],
				     utils.multiplyMatrices(
					 utils.MakeRotateXMatrix(-30),
					 utils.MakeRotateYMatrix(30)
				     ) );
			   
	// Make an cavalier projection view, w = 40, a = 16/9, n = 1, f = 101, at 45 degrees
    var O1 =  utils.multiplyMatrices([1/40,	0.0,		0.0,		0.0,
				      0.0,		(16/9)/40,		0.0,		0.0,
				      0.0,		0.0,		-2/(100),		-(102)/100,
				      0.0,		0.0,		0.0,		1.0],
				     [1,	0.0,		- Math.cos(45),		0.0,
				      0.0,		1,		- Math.sin(45),		0.0,
				      0.0,		0.0,		1,		0.0,
				      0.0,		0.0,		0.0,		1.0]
				     
				    );

	// Make a cabinet projection view, w = 40, a = 16/9, n = 1, f = 101, at 60 degrees
    var O2 =  utils.multiplyMatrices([1/40,	0.0,		0.0,		0.0,
				      0.0,		(16/9)/40,		0.0,		0.0,
				      0.0,		0.0,		-2/(100),		-(102)/100,
				      0.0,		0.0,		0.0,		1.0],
				     [1,	0.0,		- 0.5 * Math.cos(45),		0.0,
				      0.0,		1,		- 0.5 * Math.sin(45),		0.0,
				      0.0,		0.0,		1,		0.0,
				      0.0,		0.0,		0.0,		1.0]);

	return [A1, A2, A3, O1, O2];
}

