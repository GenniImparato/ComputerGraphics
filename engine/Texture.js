class TextureMaterial extends SimpleMaterial {

	constructor(txFile) {
	    super(255, 255, 255, 255);
		// default white specular
		this.specR = 1.0;
		this.specG = 1.0;
		this.specB = 1.0;
		this.specA = 1.0;
		this.gamma = 100;

		this.textureLocation = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, textureLocation);
		this.image = new Image();
		this.image.src = txFile;
		this.image.addEventListener('load', function(){
				gl.generateMipmap(gl.TEXTURE_2D);
		});
	    if(!textureShader)
	    {
		textureShader = new Shader("vs_2.glsl", "fs_tex.glsl");
	    }
	    this.shader  = textureShader;
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
