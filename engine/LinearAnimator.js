class KeyFrame
{
	constructor(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.rotX = rotX;
		this.rotY = rotY;
		this.rotZ = rotZ;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.scaleZ = scaleZ;
	}

	//interpolates this with the next frame
	//interpolatePosition range: [0.0, 1.0];
	interpolate(nextframe, interpolatePosition)
	{
		return new KeyFrame(this.x + (nextframe.x - this.x)*interpolatePosition,
							this.y + (nextframe.y - this.y)*interpolatePosition,
							this.z + (nextframe.z- this.z)*interpolatePosition, 
							this.rotX + (nextframe.rotX - this.rotX)*interpolatePosition,
							this.rotY + (nextframe.rotY - this.rotY)*interpolatePosition,
							this.rotZ + (nextframe.rotZ- this.rotZ)*interpolatePosition, 
							this.scaleX + (nextframe.scaleX - this.scaleX)*interpolatePosition,
							this.scaleY + (nextframe.scaleY - this.scaleY)*interpolatePosition,
							this.scaleZ + (nextframe.scaleZ- this.scaleZ)*interpolatePosition);

	}
}

class LinearAnimator
{
	constructor(object)
	{
		this.keyFrames = [];
		this.kfCount = 0;

		this.currTime = 0.0;
		this.currFrame = 0;

		this.playing = false;
		this.reverse = false;

		this.object = object;
	}

	addKeyFrame(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ)
	{
		this.keyFrames[this.kfCount] = new KeyFrame(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ);
		this.kfCount++;
	}

	playAnimation()
	{
		this.playing = true;
		this.reverse = false;
	}

	playReverseAnimation()
	{
		this.playing = true;
		this.reverse = true;
	}

	stopAnimation()
	{
		this.playing = false;
	}

	update()
	{
		if(this.playing)
		{
			if(this.reverse)
				this.currTime--;
			else
				this.currTime++;

			if(this.reverse && (this.currTime <= this.currFrame*30))
			{
				if(this.currFrame == 0)
					this.stopAnimation();
				else
					this.currFrame--;
			}
			if(this.currTime >= this.currFrame*30)
			{
				if(this.currFrame == this.kfCount-1)
					this.stopAnimation();
				else
					this.currFrame++;
			}

		}

		var interpolatedFrame = this.keyFrames[0].interpolate(this.keyFrames[1], this.currTime/30);
		this.object.setPosition(interpolatedFrame.x, interpolatedFrame.y, interpolatedFrame.z);
		this.object.setRotation(interpolatedFrame.rotX, interpolatedFrame.rotY, interpolatedFrame.rotZ);
		this.object.setScale(interpolatedFrame.scaleX, interpolatedFrame.scaleY, interpolatedFrame.scaleZ);
	}
}