var textureShader;

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
			textureShader = new Shader("vs_tex.glsl", "fs_tex.glsl");
	    }
	    this.shader  = textureShader;

		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.activeTexture(gl.TEXTURE0 + 0);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
		

		var image = new Image();
		var powerOf2 = false;
		requestCORSIfNotSameOrigin(image, textureDir + txFile);
		image.onload = function(){
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
					gl.generateMipmap(gl.TEXTURE_2D);
					gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
   					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
				console.log("Image loaded for " + txFile)
		};
		image.src = textureDir + txFile;
		console.log("loading image " + image.src);
		this.wrap = gl.CLAMP_TO_EDGE;
		this.image = image;
		this.texture = texture;

	    
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
	     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.image);
	    	gl.generateMipmap(gl.TEXTURE_2D);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
   			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

	   
   		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrap);
   		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrap);
   		


	    light.bind(this.shader);
		
		var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
		var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
		var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
		gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
		gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
		gl.uniform1f(specularShineLoc, this.gamma);
    }
    
}
