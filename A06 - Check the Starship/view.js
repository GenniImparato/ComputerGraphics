function view(cx, cy, cz, alpha, beta, rho) {
	// Create a view matrix for a camera in position cx, cy and cz, looking in the direction specified by
	// alpha, beta and rho, as outlined in the course slides.
    var out =  utils.invertMatrix(utils.multiplyMatrices(
	utils.MakeTranslateMatrix(cx,cy,cz),
	utils.multiplyMatrices(
	    utils.MakeRotateYMatrix(alpha),
	    utils.multiplyMatrices(
		utils.MakeRotateXMatrix(beta),
		utils.MakeRotateZMatrix(rho)
	    )
	)
    )) ; 

	return out;
}

