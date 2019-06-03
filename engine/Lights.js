class Light {
	
	constructor(name, x, y, z) {
		this.name = name;// prefix used in gl variables
		this.x = x;
		this.y = y;
	        this.z = z;
		this.Rcolor = 0.0;
		this.Gcolor = 0.0;
		this.Bcolor = 0.0;		
	}

    setLightPosition(x, y, z){
		this.x = x;
		this.y = y;
	    this.z = z;
    }


    setLightDirection(dirx, diry, dirz) {
	var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
		this.dirx = dirx / length;
		this.diry = diry / length;
		this.dirz = dirz / length ; 
    }

	setColor(red, green, blue) {
		this.Rcolor = red;
		this.Gcolor = green;
		this.Bcolor = blue;
	}

    getLightPosition() {return [this.x, this.y, this.z];}

    getLightDirection() {return [this.dirx, this.diry, this.dirz];}


	getLightColor3() {return [this.Rcolor, this.Gcolor, this.Bcolor];}


    moveToCameraSpace(viewMatrix) {
	this.lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));
	this.lightPosMatrix = viewMatrix; 
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
		this.lightType = [1.0, 0.0, 0.0];
	}

	bind() { // bind gl variables 
		var lightTypeLoc = globalShader.getUniformLocation(this.name + "Type");
		var directionLoc = globalShader.getUniformLocation(this.name + 'Dir');
		var colorLoc = globalShader.getUniformLocation(this.name + 'Color');
	    var lightDirMatrixLoc = globalShader.getUniformLocation(this.name + "DirMatrix");	 
	    gl.uniform3f(lightTypeLoc, 1.0, 0.0, 0.0);   
		gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);
		gl.uniform3f(directionLoc, this.dirx, this.diry, this.dirz);
	    gl.uniformMatrix4fv(lightDirMatrixLoc, gl.FALSE , utils.transposeMatrix(this.lightDirMatrix));
	}

}

class PointLight extends Light {
	constructor(name, x, y, z, target, decay) {
		super(name, x, y, z);
		this.targetDistance = target;
		this.decay = decay;
		this.dirx = 1.0;
		this.diry = 0.0;
		this.dirz = 0.0; 

	}

	bind() { // bind gl variables 
		var lightTypeLoc = globalShader.getUniformLocation(this.name + "Type");
		var directionLoc = globalShader.getUniformLocation(this.name + 'Dir');
		var colorLoc = globalShader.getUniformLocation(this.name + 'Color');
		var targetLoc = globalShader.getUniformLocation(this.name + 'Target');
		var positionLoc = globalShader.getUniformLocation(this.name + 'Pos');
		var decayLoc = globalShader.getUniformLocation(this.name + 'Decay');
		var lightMatrixLoc = globalShader.getUniformLocation(this.name + 'PosMatrix');
		var lightDirMatrixLoc = globalShader.getUniformLocation(this.name + "DirMatrix");	
		gl.uniform3f(lightTypeLoc, 0.0, 1.0, 0.0);   
		gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);	
		gl.uniform3f(directionLoc, 0.0, 0.0, 0.0);
		gl.uniform1f(targetLoc, this.targetDistance);
		gl.uniform1f(decayLoc, this.decay);
		gl.uniform3f(positionLoc, this.x, this.y, this.z);
		gl.uniformMatrix4fv(lightMatrixLoc, gl.FALSE, utils.transposeMatrix(this.lightPosMatrix));
		gl.uniformMatrix4fv(lightDirMatrixLoc, gl.FALSE , utils.transposeMatrix(this.lightDirMatrix));
	}

}

class SpotLight extends Light {
	constructor(name, x, y, z, dirx, diry, dirz, target, decay) {
		super(name, x,y,z);
	var length = Math.sqrt(dirx * dirx - diry * diry - dirz * dirz);
		this.dirx = dirx / length;
		this.diry = diry / length;
		this.dirz = dirz / length ; 
		this.targetDistance = target;
		this.decay = decay;
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


	bind() { // bind gl variables 
		var lightTypeLoc = globalShader.getUniformLocation(this.name + "Type");
		var directionLoc = globalShader.getUniformLocation(this.name + 'Dir');
		var colorLoc = globalShader.getUniformLocation(this.name + 'Color');
		var targetLoc = globalShader.getUniformLocation(this.name + 'Target');
		var positionLoc = globalShader.getUniformLocation(this.name + 'Pos');
		var coneInLoc = globalShader.getUniformLocation(this.name + 'ConeIn');
		var coneOutLoc = globalShader.getUniformLocation(this.name + 'ConeOut');
		var decayLoc = globalShader.getUniformLocation(this.name + 'Decay');
		gl.uniform3f(lightTypeLoc, 0.0, 0.0, 1.0);
		gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);	
		gl.uniform3f(directionLoc, this.dirx, this.diry, this.dirz);
	    gl.uniform3f(positionLoc, this.x, this.y, this.z);
		gl.uniform1f(targetLoc, this.targetDistance);
		gl.uniform1f(coneInLoc, this.coneIn);
		gl.uniform1f(coneOutLoc, this.coneOut);
		gl.uniform1f(decayLoc, this.decay);
		
	}

}

