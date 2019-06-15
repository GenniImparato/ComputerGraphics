class LinearAnimator
{
	constructor(object, instance)
	{
		this.keyFrames = [];
		this.kfCount = 0;

		this.currTime = 0.0;
		this.currFrame = 0;

		this.playing = false;
		this.reverse = false;

		this.object = object;
		this.duration = 1;
		this.loop = false;

		this.animatePosition = true;
		this.animateRotation = true;
		this.animateScale = true;

		this.instance = instance;
	}

	addKeyFrame(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ)
	{
		this.keyFrames[this.kfCount] = new KeyFrame(x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ);
		this.kfCount++;
	}

	enablePositionAnimation(boolean)
	{
		this.animatePosition = boolean;
	}

	enableRotationAnimation(boolean)
	{
		this.animateRotation = boolean;
	}

	enableScaleAnimation(boolean)
	{
		this.animateScale = boolean;
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


		if(this.animatePosition)
			this.object.setPosition(interpolatedFrame.x, interpolatedFrame.y, interpolatedFrame.z);
		if(this.animateRotation)
			this.object.setRotation(interpolatedFrame.rotX, interpolatedFrame.rotY, interpolatedFrame.rotZ);
		if(this.animateScale)
			this.object.setScale(interpolatedFrame.scaleX, interpolatedFrame.scaleY, interpolatedFrame.scaleZ);
	}
}