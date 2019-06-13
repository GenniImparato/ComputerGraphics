class BezierAnimator extends LinearAnimator {
    
    update() {
		if(this.playing)
		{
			if (this.reverse)
				this.currTime--;
			else	
				this.currTime++;

			if(this.currTime > this.duration) {
				this.currTime = this.duration;
				if(this.loop) 
				{
					this.reverse = !this.reverse;
				}
			}

			if(this.currTime < 0) {
				this.currTime = 0;
				if(this.loop) 
				{
					this.currTime--;
					this.reverse = !this.reverse;
				}
			}
		}

		var interpolatedFrame = this.bezierInterpolation(this.keyFrames,(this.currTime/this.duration));


		if(this.animatePosition)
			this.object.setPosition(interpolatedFrame.x, interpolatedFrame.y, interpolatedFrame.z);
		if(this.animateRotation)
			this.object.setRotation(interpolatedFrame.rotX, interpolatedFrame.rotY, interpolatedFrame.rotZ);
		if(this.animateScale)
			this.object.setScale(interpolatedFrame.scaleX, interpolatedFrame.scaleY, interpolatedFrame.scaleZ);
    }


    bezierInterpolation(keyframes, alpha) {
	// position interpolation
	var i = 0;
	var intermediateStep =  [];
	for(i = 0; i < keyframes.length; i++) {
		intermediateStep.push([keyframes[i].x, keyframes[i].y, keyframes[i].z]);
	}
	var frameCoordinates;
	var tempArray = [];
	var tempCoordinate1 = [];
	var tempCoordinate2 = [];
	
	while (intermediateStep.length > 2) {
	    for( i = 0 ; i < intermediateStep.length - 1; i++) {
		tempCoordinate1 = [intermediateStep[i][0], intermediateStep[i][1], intermediateStep[i][2]];
		tempCoordinate2 = [intermediateStep[i+1][0], intermediateStep[i+1][1], intermediateStep[i+1][2]];
		tempArray.push(this.lerp(tempCoordinate1, tempCoordinate2, alpha));
	    }
	    intermediateStep = tempArray;
	    tempArray = [];
	}
	tempCoordinate1 = [intermediateStep[0][0], intermediateStep[0][1], intermediateStep[0][2]];
	tempCoordinate2 = [intermediateStep[1][0], intermediateStep[1][1], intermediateStep[1][2]];
	frameCoordinates = this.lerp(tempCoordinate1, tempCoordinate2, alpha);
	// rotation interpolation
	intermediateStep = [];
	var tempQ1;
	var tempQ2;
	var frameQ;
	var frameRotations;
	for(i = 0; i < keyframes.length; i++) {
		intermediateStep.push(Quaternion.fromEuler(keyframes[i].rotX, keyframes[i].rotY, keyframes[i].rotZ));
	}
	while (intermediateStep.length > 2) {
	    for( i = 0 ; i < intermediateStep.length - 1; i++) {
		tempQ1 = intermediateStep[i];
		tempQ2 = intermediateStep[i+1];
		tempArray.push(tempQ1.slerp(tempQ2)(alpha));
	    }
	    intermediateStep = tempArray;
	    tempArray = [];
	}
	tempQ1 = intermediateStep[0];
	tempQ2 = intermediateStep[1];
	frameQ = tempQ1.slerp(tempQ2)(alpha);
	frameRotations = utils.eulerFromQuaternion(frameQ);
	return new KeyFrame(frameCoordinates[0], frameCoordinates[1], frameCoordinates[2],
				  utils.radToDeg(frameRotations[0]), utils.radToDeg(frameRotations[1]), utils.radToDeg(frameRotations[2]),
				  1, 1, 1);
    }

    lerp(a, b ,alpha) { // of coordinates
	var result = [];
	result.push((1 - alpha ) * a[0] + alpha * b[0]); 
	result.push((1 - alpha ) * a[1] + alpha * b[1]); 
	result.push((1 - alpha ) * a[2] + alpha * b[2]); 
	return result;
    }

}

