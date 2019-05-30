class Texture {

	constructor(txFile, txVariable) {
		this.textureLocation = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		this.image = new Image();
		this.image.src = txFile;
		this.image.addEventListener('load', function(){
				gl.generateMipmap(gl.TEXTURE_2D);
		});
	}

	getTextureLocation() { return this.textureLocation; }

	getTextureImage() { return.this.image; }
}