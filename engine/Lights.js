class Light {
	
	constructor(name, x, y, z) {
		this.name = name;// prefix used in gl variables
		this.x = x;
		this.y = y;
	        this.z = z;
		this.Rcolor = 1.0;
		this.Gcolor = 1.0;
		this.Bcolor = 1.0;		
	   this.movedPosition = [x, y, z, 1.0];
	    this.on = 1.0;
	}

    setLightPosition(x, y, z){
		this.x = x;
		this.y = y;
	    this.z = z;
    }

    rotateLight(angle, elevation) {
	var rotationMatrix = utils.sub3x3from4x4(utils.multiplyMatrices(utils.MakeRotateYMatrix(angle),utils.MakeRotateYMatrix(elevation)));
	var newDir  = utils.multiplyMatrix3Vector3(rotationMatrix, [this.dirx, this.diry, this.dirz]);
	this.dirx = newDir[0];
	this.diry = newDir[1];
	this.dirz = newDir[2];
    }


    setLightDirection(dirx, diry, dirz) {
	var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
		this.dirx = dirx / length;
		this.diry = diry / length;
		this.dirz = dirz / length ; 
	this.movedDir = [dirx, diry, dirz];
    }

	setColor(red, green, blue) {
		this.Rcolor = red / 255;
		this.Gcolor = green / 255;
		this.Bcolor = blue / 255;
	}

    getLightPosition() {return [this.x, this.y, this.z];}

    getLightDirection() {return [this.dirx, this.diry, this.dirz];}


	getLightColor3() {return [this.Rcolor, this.Gcolor, this.Bcolor];}


    moveToCameraSpace(viewMatrix) {
	var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));
	var lightPosMatrix = viewMatrix; 
	this.movedPosition = utils.multiplyMatrixVector(lightPosMatrix, [this.x, this.y, this.z, 1.0]);
	this.movedDir = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), [this.dirx, this.diry, this.dirz]);
	}

    static moveAllLights(viewMatrix) {
	lights.forEach(function (light) {light.moveToCameraSpace(viewMatrix);});
    }

    static bindAllLights(shader) {
	lights.forEach(function (light) {light.bind(shader);})
    }

}

class DirectionalLight extends Light {
	constructor(name, dirx, diry, dirz) {
	    super(name, 0.0 ,0.0 ,0.0);

	    var length = Math.sqrt(dirx * dirx +
				   diry * diry +
				   dirz * dirz);
		this.dirx = dirx / length;
		this.diry = diry / length;
		this.dirz = dirz / length ; 
	    
	}

	bind(shader) { // bind gl variables 
		var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
		var directionLoc = shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = shader.getUniformLocation(this.name + 'Color');
	    var lightOnLoc = shader.getUniformLocation(this.name + "On");
	    gl.uniform1f(lightOnLoc,this.on);
	    gl.uniformMatrix4v(lightViewMatrixLoc, utils.transposeMatrix(this.lightPosMatrix));
	    gl.uniformMatrix3v(lightRotationMatrix, utils.transposeMatrix3(this.lightDirMatrix));
	        gl.uniform3f(lightTypeLoc, 1.0, 0.0, 0.0);   
		gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);
		gl.uniform3f(directionLoc, this.movedDir[0], this.movedDir[1], this.movedDir[2]);
	}

}

class PointLight extends Light {
	constructor(name, x, y, z, target, decay) {
		super(name, x, y, z);
		this.targetDistance = target;
		this.decay = decay;
		this.dirx = 0.0;
		this.diry = 0.0;
		this.dirz = 0.0; 

	}

	bind(shader) { // bind gl variables 
		var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
		var directionLoc = shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = shader.getUniformLocation(this.name + 'Color');
		var targetLoc = shader.getUniformLocation(this.name + 'Target');
		var positionLoc = shader.getUniformLocation(this.name + 'Pos');
		var decayLoc = shader.getUniformLocation(this.name + 'Decay');
	    var lightOnLoc = shader.getUniformLocation(this.name + "On");
	    gl.uniform1f(lightOnLoc, this.on);
		gl.uniform3f(lightTypeLoc, 0.0, 1.0, 0.0);   
		gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);	
		gl.uniform3f(directionLoc, this.movedDir[0], this.movedDir[1], this.movedDir[2]);
		gl.uniform1f(targetLoc, this.targetDistance);
		gl.uniform1f(decayLoc, this.decay);
	        gl.uniform3f(positionLoc, this.movedPosition[0], this.movedPosition[1], this.movedPosition[2]);
	}

}

class SpotLight extends Light {
	constructor(name, x, y, z, dirx, diry, dirz, target, decay) {
		super(name, x,y,z);
	var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
		this.dirx = dirx / length || 0;
		this.diry = diry / length || -1;
	    this.dirz = dirz / length || 0; 
		this.targetDistance = target || 1.0;
		this.decay = decay || 0;
		this.coneIn = 0.5;
		this.coneOut = 0.5;

	}

	setDecay(decay) {
		this.decay = decay;
	}

	setTarget(target) {
		this.targetDistance = target;
	}

	setCone(coneIn, coneOut ) {	
		this.coneIn = coneIn;
		this.coneOut = coneOut;
	}


	bind(shader) { // bind gl variables 
		var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
		var directionLoc = shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = shader.getUniformLocation(this.name + 'Color');
		var targetLoc = shader.getUniformLocation(this.name + 'Target');
		var positionLoc = shader.getUniformLocation(this.name + 'Pos');
		var coneInLoc = shader.getUniformLocation(this.name + 'ConeIn');
		var coneOutLoc = shader.getUniformLocation(this.name + 'ConeOut');
		var decayLoc = shader.getUniformLocation(this.name + 'Decay');
	    var lightOnLoc = shader.getUniformLocation(this.name + "On");
	    gl.uniform1f(lightOnLoc,this.on);
		gl.uniform3f(lightTypeLoc, 0.0, 0.0, 1.0);
		gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);	
		gl.uniform3f(directionLoc, this.movedDir[0], this.movedDir[1], this.movedDir[2]);
	        gl.uniform3f(positionLoc, this.movedPosition[0], this.movedPosition[1], this.movedPosition[2]);
		gl.uniform1f(targetLoc, this.targetDistance);
		gl.uniform1f(coneInLoc, this.coneIn);
		gl.uniform1f(coneOutLoc, this.coneOut);
		gl.uniform1f(decayLoc, this.decay);	
	}

}

