function worldViewProjection(carx, cary, carz, cardir, camx, camy, camz, aspectRatio) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.
// Since the game is basically in 2D, camdir contains the rotation about the y-axis to orient the car

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.

// The projection matrix is perspective projection matrix, with the aspect ratio written in parameter
// aspectRatio, a vertical Fov-y of 60 degrees, and with near and far planes repsectively at 0.1 and 1000.0
    const u = [0,1,0]
    var vz = [(camx - carx) , (camy - cary) ,  (camz - carz) ];
    vz = utils.normalizeVector3(vz);
    var vx = utils.crossVector(u,vz);
    vx = utils.normalizeVector3(vx);
    var vy = utils.crossVector(vz, vx);
    vy = utils.normalizeVector3(vy)
    var cameraMatrix = [vx[0], vy[0], vz[0], camx,
			vx[1], vy[1], vz[1], camy,
			vx[2], vy[2], vz[2], camz,
		        0, 0, 0, 1];

    
    var world = utils.multiplyMatrices(
	utils.MakeTranslateMatrix(carx,cary,carz),
	utils.MakeRotateYMatrix(cardir)
    );
    var view  = utils.invertMatrix(cameraMatrix);
    var projection = [1/(aspectRatio * Math.tan(utils.degToRad(30))), 0, 0, 0,
		      0, 1 / ( Math.tan(utils.degToRad(30))), 0, 0,
		      0, 0,  (1000 + 0.1)/(0.1  - 1000), (2 * 1000 * 0.1 ) / (0.1 - 1000),
		      0, 0, -1, 0];

	return [world, view, projection];
}

