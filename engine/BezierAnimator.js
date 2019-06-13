class BezierAnimator extends LinearAnimator {
    
    update() {
		if(this.playing)
		{
			if(this.reverse)
				this.currTime--;
			else
				this.currTime++;

			if(this.reverse && (this.currTime <= this.currFrame*this.duration))
			{
				if(this.currFrame == 0)
				{
					this.currTime = 0;

					if(!this.loop)
						this.stopAnimation();
					else
						this.playAnimation(this.duration, true);
					
				}
				else
					this.currFrame--;
			}
			if(this.currTime >= (this.currFrame+1)*this.duration)
			{
				if(this.currFrame == this.kfCount-2)
				{
					this.currTime = (this.currFrame+1)*this.duration;

					if(!this.loop)
						this.stopAnimation();
					else
						this.playReverseAnimation(this.duration, true);

				}
				else
					this.currFrame++;
			}

		}

	var interpolatedFrame = bezierInterpolation(this.keyFrames,(this.currTime - this.currFrame*this.duration)/this.duration);


		if(this.animatePosition)
			this.object.setPosition(interpolatedFrame.x, interpolatedFrame.y, interpolatedFrame.z);
		if(this.animateRotation)
			this.object.setRotation(interpolatedFrame.rotX, interpolatedFrame.rotY, interpolatedFrame.rotZ);
		if(this.animateScale)
			this.object.setScale(interpolatedFrame.scaleX, interpolatedFrame.scaleY, interpolatedFrame.scaleZ);
    }


    bezierInterpolation(keyframes, alpha) {
	// position interpolation
	var intermediateStep = keyframes;
	var frameCoordinates;
	var tempArray = [];
	var tempCoordinate1 = [];
	var tempCoordinate2 = [];
	while (intermediateStep.length > 2) {
	    for( i = 0 ; i < intermediateStep.length - 1; i++) {
		tempCoordinate1 = [intermediateStep[i].x, intermediateStep[i].y, intermediateStep[i].z];
		tempCoordinate2 = [intermediateStep[i+1].x, intermediateStep[i+1].y, intermediateStep[i+1].z];
		tempArray.push(linearLerp(tempCoordinate1, tempCoordinate2, alpha));
	    }
	    intermediateStep = tempArray;
	    tempArray = [];
	}
	tempCoordinate1 = [intermediateStep[0].x, intermediateStep[0].y, intermediateStep[0].z];
	tempCoordinate2 = [intermediateStep[1].x, intermediateStep[1].y, intermediateStep[1].z];
	frameCoordinates = linearLerp(tempCoordinate1, tempCoordinate2, alpha);
	// rotation interpolation
	intermediateStep = keyframes;
	var tempQ1;
	var tempQ2;
	var frameQ;
	var frameRotations;
	while (intermediateStep.length > 2) {
	    for( i = 0 ; i < intermediateStep.length - 1; i++) {
		tempQ1 = Quaternion.fromEuler(intermediateStep[i].rotz, intermediateStep[i].rotx, intermediateStep[i].roty);
		tempQ2 = Quaternion.fromEuler(intermediateStep[i+1].rotz, intermediateStep[i+1].rotx, intermediateStep[i+1].roty);
		tempArray.push(tempQ1.slerp(tempQ2)(alpha));
	    }
	    intermediateStep = tempArray;
	    tempArray = [];
	}
	tempQ1 = Quaternion.fromEuler(intermediateStep[0].rotz, intermediateStep[0].rotx, intermediateStep[0].roty);
	tempQ2 = Quaternion.fromEuler(intermediateStep[1].rotz, intermediateStep[1].rotx, intermediateStep[1].roty);
	frameQ = tempQ1.slerp(tempQ2)(alpha).toVector();
	frameRotations = utils.eulerFromQuaternion(frameQ);
	var result = new KeyFrame(frameCoordinates[0], frameCoordinates[1], frameCoordinates[2],
				  frameRotations[0], frameRotations[1], frameRotations[2],
				  1, 1, 1);
    }

    linearLerp(a, b ,alpha) { // of coordinates
	var result = []rotations
	result.push((1 - alpha ) * a[0] + alpha * b[0]); 
	result.push((1 - alpha ) * a[1] + alpha * b[1]); 
	result.push((1 - alpha ) * a[2] + alpha * b[2]); 
	return result;
    }
}
