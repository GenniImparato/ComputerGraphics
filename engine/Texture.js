var textureShader;
var textureDiffuseShader;

var texturesCount = 0;


function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

 function textureLoaderCallback () {
	this.txId = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0 + this.txNum);
	gl.bindTexture(gl.TEXTURE_2D, this.txId);		
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);		
	if (isPowerOf2(this.width) &&
    	isPowerOf2(this.height)) {
    		gl.generateMipmap(gl.TEXTURE_2D);
	} else {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	}
}

class TextureMaterial extends SimpleMaterial {

    constructor(txFile) {
	super(255, 255, 255, 255);
	// default white specular
	this.specR = 1.0;
	this.specG = 1.0;
	this.specB = 1.0;
	this.specA = 1.0;
	this.gamma = 100;

		if(!textureShader)
	    {
			textureShader = new Shader("vs_tex.glsl", "fs_tex.glsl", true);
	    }
	    this.shader  = textureShader;

		this.image = new Image();
		this.image.txNum = texturesCount;
		texturesCount++;
		this.powerOf2 = false;
		requestCORSIfNotSameOrigin(this.image, textureDir + txFile);
		this.image.src = textureDir + txFile;
		this.image.onload = textureLoaderCallback;
    }

    setRepeat(boolean) {
		if(boolean) {
		    this.wrap = gl.REPEAT;
		}
		else {
		    this.wrap = gl.CLAMP_TO_EDGE;
		}
    }

    bindShader() {	
	    this.shader.use();
	    // setup texture

 		gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);

	    light.bind(this.shader);
		
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
    }
    
}

class TextureDiffuse extends SimpleMaterial {

    constructor(txFile) {
	super(255, 255, 255, 255);
	// default white specular
	this.specR = 1.0;
	this.specG = 1.0;
	this.specB = 1.0;
	this.specA = 1.0;
	this.gamma = 100;

		if(!textureDiffuseShader)
	    {
			textureDiffuseShader = new Shader("vs_tex.glsl", "fs_tex_diffuse.glsl", true);
	    }
	    this.shader  = textureDiffuseShader;

		this.image = new Image();
		this.image.txNum = texturesCount;
		texturesCount++;
		this.powerOf2 = false;
		requestCORSIfNotSameOrigin(this.image, textureDir + txFile);
		this.image.src = textureDir + txFile;
		this.image.onload = textureLoaderCallback;
    }

    setRepeat(boolean) {
		if(boolean) {
		    this.wrap = gl.REPEAT;
		}
		else {
		    this.wrap = gl.CLAMP_TO_EDGE;
		}
    }

    bindShader() {	
	    this.shader.use();
	    // setup texture
 		gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);

	    light.bind(this.shader);
		
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
    }
    
}

