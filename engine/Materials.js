class SimpleMaterial {
	

	constructor(diffRed, diffGreen, diffBlue, diffAlpha, shader) {
		this.diffR = diffRed;
		this.diffG = diffGreen;
		this.diffB = diffBlue;
		this.diffA = diffAlpha;
		this.shader = shader;
	}

	setDiffuseColor(diffRed, diffGreen, diffBlue, diffAlpha) {
		this.diffR = diffRed;
		this.diffG = diffGreen;
		this.diffB = diffBlue;
		this.diffA = diffAlpha;
	}

	bindColors() {
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialTypeLoc = this.shader.getUniformLocation("mType");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform3f(materialTypeLoc, 1.0, 0.0, 0.0);
	}

}

class SpecularMaterial extends SimpleMaterial {


	constructor(diffRed, diffGreen, diffBlue, diffAlpha, specRed, specGreen, specBlue, specAlpha, shader) {
		super(diffRed, diffGreen, diffBlue, diffAlpha, shader);
		this.specR = specRed;
		this.specG = specGreen;
		this.specB = specBlue;
		this.specA = specAlpha;
		this.shader = shader;
		this.gamma = 100;
	}

	setSpecularColor( specRed, specGreen, specBlue, specAlpha) {
		this.specR = specRed;
		this.specG = specGreen;
		this.specB = specBlue;
		this.specA = specAlpha;
	}

	setSpecularShine(gamma) {
		this.gamma = gamma;
	}

	bindColors() {
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		var materialTypeLoc = this.shader.getUniformLocation("mType");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
		gl.uniform3f(materialTypeLoc, 1.0, 1.0, 0.0);
	}

}