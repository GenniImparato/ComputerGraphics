class KeyFrame
{
	constructor(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, time)
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

		this.time = time;
	}

	//interpolates this with the next frame
	//interpolatePosition range: [0.0, 1.0];
	interpolate(nextframe, interpolatePosition)
	{
		var interpolated;
		interpolated.x = this.x + (nextframe.x - this.x)*interpolatePosition;
		interpolated.y = this.y + (nextframe.y - this.y)*interpolatePosition;
		interpolated.z = this.z + (nextframe.z- this.z)*interpolatePosition;
		/*interpolated.rotX = this.this.x + (nextframe.x - this.x)*interpolatePosition;
		interpolated.rotY = this.this.x + (nextframe.x - this.x)*interpolatePosition;
		interpolated.rotZ = this.this.x + (nextframe.x - this.x)*interpolatePosition;
		interpolated.scaleX = this.scaleX - nextframe.scaleX;
		interpolated.scaleY = this.scaleY - nextframe.scaleY;
		interpolated.scaleZ = this.scaleZ - nextframe.scaleZ;*/
	}
}

class LinearAnimator
{
	constructor(object)
	{
		this.keyFrames = [];
		this.kfCount = 0;

		this.currTime = 0.0;

		this.object = object;
	}

	addKeyFrame(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, duration)
	{
		this.keyFrames[this.kfCount] = new KeyFrame(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, duration);
		this.kfCount++;
	}

	playAnimation()
	{
		this.currTime++;

		var interpolatedFrame = this.keyFrames[0].interpolate(this.keyFrames[1], this.currTime/1000);
		this.object.setPosition(interpolatedFrame.x, interpolatedFrame.y interpolatedFrame.z);
	}


}