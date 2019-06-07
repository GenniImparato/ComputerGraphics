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
	    this.rotation = utils.MakeRotateXMatrix(0);
	}

    setPosition(x, y, z){
		this.x = x;
		this.y = y;
	    this.z = z;
    }

    setRotation(angle, elevation) {
	this.rotation = utils.multiplyMatrices(utils.MakeRotateYMatrix(angle),utils.MakeRotateXMatrix(elevation));
	 
    }


    setDirection(dirx, diry, dirz) {
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
	var rotatedDir = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(this.rotation), [this.dirx, this.diry, this.dirz]);
	this.movedDir = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), rotatedDir);
	}


    bind(shader) {
		var directionLoc = shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = shader.getUniformLocation(this.name + 'Color');
		var positionLoc = shader.getUniformLocation(this.name + 'Pos');
		var targetLoc = shader.getUniformLocation(this.name + 'Target');
		var decayLoc = shader.getUniformLocation(this.name + 'Decay');
		var coneInLoc = shader.getUniformLocation(this.name + 'ConeIn');
		var coneOutLoc = shader.getUniformLocation(this.name + 'ConeOut');
	        var lightOnLoc = shader.getUniformLocation(this.name + "On");
	        gl.uniform1f(lightOnLoc,this.on);
		gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);	
		gl.uniform3f(directionLoc, this.movedDir[0], this.movedDir[1], this.movedDir[2]);
	        gl.uniform3f(positionLoc, this.movedPosition[0], this.movedPosition[1], this.movedPosition[2]);
		gl.uniform1f(targetLoc, this.targetDistance);
		gl.uniform1f(decayLoc, this.decay);
		gl.uniform1f(coneInLoc, this.coneIn);
		gl.uniform1f(coneOutLoc, this.coneOut);
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
	    this.coneIn = 1.0;
	    this.coneOut = 0.0;
	    this.targetDistance = 1.0;
	    this.decay = 0.0;
	    
	}

	bind(shader) { // bind gl variables 
	    super.bind(shader);
		var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
	        gl.uniform3f(lightTypeLoc, 1.0, 0.0, 0.0);   
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
	    this.coneIn = 0.0;
	    this.coneOut = 0.0;

	}

	bind(shader) { // bind gl variables 
	    super.bind(shader);
		var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
		gl.uniform3f(lightTypeLoc, 0.0, 1.0, 0.0);   
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
	    super.bind(shader);
		var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
		gl.uniform3f(lightTypeLoc, 0.0, 0.0, 1.0);
	}

}

