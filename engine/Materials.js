class SimpleMaterial {
	

	constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
		this.diffR = diffRed;
		this.diffG = diffGreen;
		this.diffB = diffBlue;
		this.diffA = diffAlpha;
	}

	setDiffuseColor(diffRed, diffGreen, diffBlue, diffAlpha) {
		this.diffR = diffRed;
		this.diffG = diffGreen;
		this.diffB = diffBlue;
		this.diffA = diffAlpha;
	}

	bindColors() {
		var materialDiffLoc = globalShader.getUniformLocation("mDiffColor");
		var materialTypeLoc = globalShader.getUniformLocation("mType");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform3f(materialTypeLoc, 1.0, 0.0, 0.0);
	}

}

class SpecularMaterial extends SimpleMaterial {


	constructor(diffRed, diffGreen, diffBlue, diffAlpha, specRed, specGreen, specBlue, specAlpha) {
		super(diffRed, diffGreen, diffBlue, diffAlpha);
		this.specR = specRed;
		this.specG = specGreen;
		this.specB = specBlue;
		this.specA = specAlpha;
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
		var materialDiffLoc = globalShader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = globalShader.getUniformLocation("mSpecColor");
		var specularShineLoc = globalShader.getUniformLocation("mSpecShine");
		var materialTypeLoc = globalShader.getUniformLocation("mType");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
		gl.uniform3f(materialTypeLoc, 1.0, 1.0, 0.0);
	}

}