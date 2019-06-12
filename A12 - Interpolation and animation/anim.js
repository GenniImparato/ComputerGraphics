function anim(cx, cy, cz, qx, qy, qz, qw, alpha) {
	// cx, cy, cz are arrays of four points
	// qx, qy, qz, qw are arrays of four quaternions
	// returns transform matrix with rotation and translation given
	// by Bezier interpolation of the input positions
	// according to parameter alpha (0 <= alpha <= 1)
    var resultCx = applyBezier(cx, alpha);
    var resultCy = applyBezier(cy, alpha);
    var resultCz = applyBezier(cz, alpha);
    var resultQ  = applyBezierRotation(qx, qy, qz, qw, alpha);
    var out =  utils.multiplyMatrices(
	utils.MakeTranslateMatrix(resultCx, resultCy, resultCz),
	resultQ.toMatrix4()
	);
	
	return out;
}


function linearLerp(a, b ,alpha) {
    var result = (1 - alpha ) * a + alpha * b; 
    return result;
}

function normalizedLerp(a, b, alpha) { // works only with quaternions
    var result = a.scale((1 - alpha));
    result = result.add( b.scale(alpha));
    result.normalize();
    return result;
}

function sphericalLerp(a, b, alpha) {

}


function applyBezier(points, alpha) {
    var intermediateStep = points;
    var tempArray = [];
    while (intermediateStep.length > 2) {
	for( i = 0 ; i < intermediateStep.length - 1; i++) {
	    tempArray.push(linearLerp(intermediateStep[i], intermediateStep[i+1], alpha));
	}
	intermediateStep = tempArray;
	tempArray = [];
    }
    return linearLerp(intermediateStep[0], intermediateStep[1], alpha);
}

function applyBezierRotation(qxs, qys, qzs, qws, alpha) {
    var intermediateStep = [];
    var i = 0;
    for(i = 0; i < qxs.length; i++) {
	intermediateStep.push(new Quaternion({
	    w: qws[i],
	    x: qxs[i],
	    y: qys[i],
	    z: qzs[i]
	}))
    }
    var tempArray = [];
    // while (intermediateStep.length > 2) {
    // 	for( i = 0 ; i < intermediateStep.length - 1; i++) {
    // 	    tempArray.push(normalizedLerp(intermediateStep[i], intermediateStep[i+1], alpha));
    // 	}
    // 	intermediateStep = tempArray;
    // 	tempArray = [];
    // 	console.log("intermediate step: ")
    // 	console.log(intermediateStep);
    // }

    while (intermediateStep.length > 2) {
	for( i = 0 ; i < intermediateStep.length - 1; i++) {
	    tempArray.push(intermediateStep[i].slerp(intermediateStep[i+1])(alpha));
	}
	intermediateStep = tempArray;
	tempArray = [];
    }
    return intermediateStep[0].slerp(intermediateStep[1])(alpha);
}
