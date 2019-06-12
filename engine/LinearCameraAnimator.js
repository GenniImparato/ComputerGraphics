class CameraKeyFrame
{
	constructor(x, y, z, angle, elevation, lookRadius)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.angle = angle;
		this.elevation = elevation;
		this.lookRadius = lookRadius;
	}

	//interpolates this with the next frame
	//interpolatePosition range: [0.0, 1.0];
	interpolate(nextframe, interpolatePosition)
	{
		return new CameraKeyFrame(this.x + (nextframe.x - this.x)*interpolatePosition,
							this.y + (nextframe.y - this.y)*interpolatePosition,
							this.z + (nextframe.z- this.z)*interpolatePosition, 
							this.angle + (nextframe.angle - this.angle)*interpolatePosition,
							this.elevation + (nextframe.elevation - this.elevation)*interpolatePosition,
							this.lookRadius + (nextframe.lookRadius- this.lookRadius)*interpolatePosition);

	}
}

class LinearCameraAnimator
{
	constructor(camera, instance)
	{
		this.keyFrames = [];
		this.kfCount = 0;

		this.currTime = 0.0;
		this.currFrame = 0;

		this.playing = false;
		this.reverse = false;

		this.camera = camera;
		this.duration = 1;
		this.loop = false;

		this.animatePosition = true;
		this.animateRotation = true;
		this.animateScale = true;

		this.instance = instance;
	}

	addKeyFrame(x, y, z, angle, elevation, lookRadius)
	{
		this.keyFrames[this.kfCount] = new CameraKeyFrame(x, y, z, angle, elevation, lookRadius);
		this.kfCount++;
	}

	playAnimation(duration, loop)
	{
		this.playing = true;
		this.reverse = false;
		this.duration = duration;
		this.loop = loop;
	}

	playReverseAnimation(duration, loop)
	{
		this.playing = true;
		this.reverse = true;
		this.duration = duration;
		this.loop = loop;
	}

	stopAnimation()
	{
		this.playing = false;
		this.onStop(this.instance);
	}

	onStop(inst)
	{}

	update()
	{
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

		var interpolatedFrame = this.keyFrames[this.currFrame].interpolate(this.keyFrames[this.currFrame+1], (this.currTime - this.currFrame*this.duration)/this.duration);

		this.camera.setLookPoint(interpolatedFrame.x, interpolatedFrame.y, interpolatedFrame.z);
		this.camera.setAngle(interpolatedFrame.angle);
		this.camera.setElevation(interpolatedFrame.elevation);
		this.camera.setLookRadius(interpolatedFrame.lookRadius);
	}
}