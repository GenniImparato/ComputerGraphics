var lambertShader;
var phongShader;
var toonShader;
var simpleShader;



class SimpleMaterial {
    
	

	constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
		this.diffR = diffRed / 255.0;
		this.diffG = diffGreen / 255.0;
		this.diffB = diffBlue / 255.0;
	    this.diffA = diffAlpha / 255.0;
	    // material ambient color
	    this.ambR = 0.0;
		this.ambG = 0.0;
		this.ambB = 0.0;
		this.ambA = 0.0;
		// low light ambient
	    this.ambLR = 0.0;
		this.ambLG = 0.0;
		this.ambLB = 0.0;
		// upper light ambient
		this.ambLA = 0.0;
		this.ambHR = 0.0;
		this.ambHG = 0.0;
		this.ambHB = 0.0;
		this.ambHA = 0.0;
		//  light ambient direction
		this.ambX = 0;
		this.ambY = 0;
		this.ambZ = 1;
		this.emitR = 0.0;
		this.emitG = 0.0;
		this.emitB = 0.0;
		this.emitA = 1.0;
	    if( !simpleShader) {
		simpleShader = new Shader("vs_3.glsl", "fs_simple.glsl")	
	    }
	    this.shader = simpleShader;
	    
	}

	setDiffuseColor(diffRed, diffGreen, diffBlue, diffAlpha) {
		this.diffR = diffRed / 255.0;
		this.diffG = diffGreen / 255.0;
		this.diffB = diffBlue / 255.0;
		this.diffA = diffAlpha / 255.0;
	}

	setAmbientLowColor(ambRed, ambGreen, ambBlue, ambAlpha) {
		this.ambLR = ambRed / 255.0;
		this.ambLG = ambGreen / 255.0;
		this.ambLB = ambBlue / 255.0;
		this.ambLA = ambAlpha / 255.0;
	}

	setAmbientHighColor(ambRed, ambGreen, ambBlue, ambAlpha) {
		this.ambHR = ambRed / 255.0;
		this.ambHG = ambGreen / 255.0;
		this.ambHB = ambBlue / 255.0;
		this.ambHA = ambAlpha / 255.0;
	}

	setAmbientDirection(ambX, ambY, ambZ) {
		this.ambX = ambX;
		this.ambY = ambY;
		this.ambZ = ambZ;
	}

	setMaterialAmbient(mambR, mambG, mambB, mambA) {
		this.ambR = mambR / 255.0;
		this.ambG = mambG / 255.0;
		this.ambB = mambB / 255.0;
		this.ambA = mambA / 255.0;
	}

	setEmissionColor(emitRed, emitGreen, emitBlue, emitAlpha) {
		this.emitR = emitRed / 255.0;
		this.emitG = emitGreen / 255.0;
		this.emitB = emitBlue / 255.0;
		this.emitA = emitAlpha / 255.0;

	}

    isLoaded() {
	return true;
    }

	bindShader() {

	    this.shader.use();
	    Light.bindAllLights(this.shader);
		var materialDiffLoc = this.shader.getUniformLocation("mColor");
		var materialAmbientLoc = this.shader.getUniformLocation("mAmbientColor");
		var materialEmitLoc = this.shader.getUniformLocation("mEmitColor");
		var ambHLoc = this.shader.getUniformLocation("ambientHighColor");
		var ambLLoc = this.shader.getUniformLocation("ambientLowColor");
		var ambDLoc = this.shader.getUniformLocation("ambientDir");
		
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialAmbientLoc, this.ambR, this.ambG, this.ambB, this.ambA);
		gl.uniform4f(materialEmitLoc, this.emitR, this.emitG, this.emitB, this.emitA);
		if(ambDLoc) {
			gl.uniform4f(ambLLoc, this.ambLR, this.ambLG, this.ambLB, this.ambLA);
			gl.uniform4f(ambHLoc, this.ambHR, this.ambHG, this.ambHB, this.ambHA);	
			gl.uniform3f(ambDLoc, this.ambX, this.ambY, this.ambZ);
		}		
	}

}

class DiffuseMaterial extends SimpleMaterial {
	constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
		super(diffRed, diffGreen, diffBlue, diffAlpha);
		// default white specular
		this.specR = 1.0;
		this.specG = 1.0;
		this.specB = 1.0;
		this.specA = 1.0;
		this.gamma = 100;
	    if(!lambertShader)
	    {
		lambertShader = new Shader("vs_3.glsl", "fs_lambert.glsl");
	    }
	    this.shader  = lambertShader;
	}

    bindShader() {
	    super.bindShader();
	    var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
	    gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
    }

}

class SpecularMaterial extends SimpleMaterial {


	constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
		super(diffRed, diffGreen, diffBlue, diffAlpha);
		// default white specular
		this.specR = 1.0;
		this.specG = 1.0;
		this.specB = 1.0;
		this.specA = 1.0;
		this.gamma = 100;
	    if(!phongShader)
	    {
		phongShader = new Shader("vs_3.glsl", "fs_phong.glsl");
	    }
	    this.shader = phongShader;
	}

	setSpecularColor( specRed, specGreen, specBlue, specAlpha) {
		this.specR = specRed / 255.0;
		this.specG = specGreen / 255.0;
		this.specB = specBlue / 255.0;
		this.specA = specAlpha / 255.0;
		return this; //useful for chaining setters
	}

	setSpecularShine(gamma) {
		this.gamma = gamma;
		return this; // useful for chaining setters
	}

	bindShader() {
		super.bindShader();
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
	}

}


class ToonMaterial extends SimpleMaterial {

    constructor(diffRed, diffGreen, diffBlue, diffAlpha, diffThreshold, specThreshold) {
		super(diffRed, diffGreen, diffBlue, diffAlpha);
		// default white specular
		this.specR = 1.0;
		this.specG = 1.0;
		this.specB = 1.0;
		this.specA = 1.0;
		this.gamma = 100;
	this.diffTh = diffThreshold;
	this.specTh = specThreshold;
	    if(!toonShader)
	    {
		toonShader = new Shader("vs_3.glsl", "fs_toon.glsl");
	    }
	    this.shader  = toonShader;
	}

    bindShader() {	
    	super.bindShader();
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
    }

    
    
}

