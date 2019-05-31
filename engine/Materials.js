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
		gl.uniform4fv(materialDiffLoc, new Float32Array([this.diffR, this.diffG, this.diffB, this.diffA]));
	}

}

class SpecularMaterial extends SimpleMaterial {


	constructor(diffRed, diffGreen, diffBlue, diffAlpha, specRed, specGreen, specBlue, specAlpha, shader) {
		super(diffRed, diffGreen, diffBlue, shader);
		this.specR = specRed;
		this.specG = specGreen;
		this.specB = specBlue;
		this.specA = specAlpha;
	}

	setSpecularColor( specRed, specGreen, specBlue, specAlpha) {
		this.specR = specRed;
		this.specG = specGreen;
		this.specB = specBlue;
		this.specA = specAlpha;
	}

	bindColors() {
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		gl.uniform4fv(materialDiffLoc, new Float32Array([this.diffR, this.diffG, this.diffB, this.diffA]));
		var materialSpecularLoc = shader.getUniformLocation("mSpecColor");
		gl.uniform4fv(materialDiffLoc, new Float32Array([this.specR, this.specG, this.specB, this.specA]));
	}

}