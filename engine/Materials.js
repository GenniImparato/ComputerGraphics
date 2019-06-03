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
	    if( !simpleShader) {
		simpleShader = new Shader("vs_2.glsl", "fs_lambert.glsl")	
	    }
	    this.shader = simpleShader;
	    
	}

	setDiffuseColor(diffRed, diffGreen, diffBlue, diffAlpha) {
		this.diffR = diffRed / 255.0;
		this.diffG = diffGreen / 255.0;
		this.diffB = diffBlue / 255.0;
		this.diffA = diffAlpha / 255.0;
	}

	bindShader() {

	    this.shader.use();
	    light.bind(this.shader);
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialTypeLoc = this.shader.getUniformLocation("mType");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform3f(materialTypeLoc, 1.0, 0.0, 0.0);
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
		lambertShader = new Shader("vs_2.glsl", "fs_lambert.glsl");
	    }
	    this.shader  = lambertShader;
	}

    bindShader() {
	    this.shader.use();
	    light.bind(this.shader);
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
		phongShader = new Shader("vs_2.glsl", "fs_phong.glsl");
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
	    this.shader.use();
	    light.bind(this.shader);
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
	}

}


class ToonMaterial extends SimpleMaterial {

	constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
		super(diffRed, diffGreen, diffBlue, diffAlpha);
		// default white specular
		this.specR = 1.0;
		this.specG = 1.0;
		this.specB = 1.0;
		this.specA = 1.0;
		this.gamma = 100;
	    if(!toonShader)
	    {
		toonShader = new Shader("vs_2.glsl", "fs_toon.glsl");
	    }
	    this.shader  = toonShader;
	}

    bindShader() {	
	    this.shader.use();
	    light.bind(this.shader);
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
    }
    
}
