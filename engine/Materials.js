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
	    this.ambR = 0.0;
		this.ambG = 0.0;
		this.ambB = 0.0;
		this.ambA = 1.0;
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

	setAmbientColor(ambRed, ambGreen, ambBlue, ambAlpha) {
		this.ambR = ambRed / 255.0;
		this.ambG = ambGreen / 255.0;
		this.ambB = ambBlue / 255.0;
		this.ambA = ambAlpha / 255.0;
	}

	setEmissionColor(emitRed, emitGreen, emitBlue, emitAlpha) {
		this.emitR = emitRed / 255.0;
		this.emitG = emitGreen / 255.0;
		this.emitB = emitBlue / 255.0;
		this.emitA = emitAlpha / 255.0;

	}


	bindShader() {

	    this.shader.use();
	    Light.bindAllLights(this.shader);
		var materialDiffLoc = this.shader.getUniformLocation("mColor");
		var materialAmbientLoc = this.shader.getUniformLocation("mAmbientColor");
		var materialEmitLoc = this.shader.getUniformLocation("mEmitColor");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialAmbientLoc, this.ambR, this.ambG, this.ambB, this.ambA);
		gl.uniform4f(materialEmitLoc, this.emitR, this.emitG, this.emitB, this.emitA);
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

