var textureShader;
var textureDiffuseShader;

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
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

		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		this.prefetchingTexturePixels = new Uint8Array([0, 0, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
             this.prefetchingTexturePixels);
		

		this.image = new Image();
		this.powerOf2 = false;
		requestCORSIfNotSameOrigin(this.image, textureDir + txFile);
		this.image.src = textureDir + txFile;
		this.image.onload = function(){
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
 		   gl.generateMipmap(gl.TEXTURE_2D);
		};
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
	    gl.bindTexture(gl.TEXTURE_2D, this.texture);
	     gl.activeTexture(gl.TEXTURE0);

	     if(this.image.complete) {
    	
    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
 		gl.generateMipmap(gl.TEXTURE_2D);
 		} else {
 			this.prefetchingTexturePixels = new Uint8Array([0, 0, 255, 255]);
 		}
 		gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.texture);

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

		if(!textureShader)
	    {
			textureShader = new Shader("vs_tex.glsl", "fs_tex_diffuse.glsl", true);
	    }
	    this.shader  = textureShader;

		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		this.prefetchingTexturePixels = new Uint8Array([0, 0, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
             this.prefetchingTexturePixels);
		

		this.image = new Image();
		this.powerOf2 = false;
		requestCORSIfNotSameOrigin(this.image, textureDir + txFile);
		this.image.src = textureDir + txFile;
		this.image.onload = function(){
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
 		   gl.generateMipmap(gl.TEXTURE_2D);
		};
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
	    gl.bindTexture(gl.TEXTURE_2D, this.texture);
	     gl.activeTexture(gl.TEXTURE0);

	     if(this.image.complete) {
    	
    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
 		gl.generateMipmap(gl.TEXTURE_2D);
 		} else {
 			this.prefetchingTexturePixels = new Uint8Array([0, 0, 255, 255]);
 		}
 		gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.texture);

	    light.bind(this.shader);
		
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
    }
    
}

