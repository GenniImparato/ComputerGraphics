class Shader
{
	//creates a shader from .vs and .fs files
	constructor(vsFile, fsFile, use_texture)
	{
		var locProgram;
		var vertexShader;
		var fragmentShader;

		utils.loadFiles([shaderDir + vsFile, shaderDir + fsFile], 
							function (shaderText) 
							{
      							locProgram = gl.createProgram();

								vertexShader = gl.createShader(gl.VERTEX_SHADER);
								gl.shaderSource(vertexShader, shaderText[0]);
								gl.compileShader(vertexShader);
								if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) 
								{
									alert("ERROR IN VS SHADER : " + gl.getShaderInfoLog(vertexShader));
								}

								var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
								gl.shaderSource(fragmentShader, shaderText[1])
								gl.compileShader(fragmentShader);		
								if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) 
								{
									alert("ERROR IN FS SHADER : " + gl.getShaderInfoLog(fragmentShader));
								}	

								gl.attachShader(locProgram, vertexShader);
								gl.attachShader(locProgram, fragmentShader);
							    gl.linkProgram(locProgram);
							    
							    if ( !gl.getProgramParameter( locProgram, gl.LINK_STATUS) ) {
								var info = gl.getProgramInfoLog(locProgram);
								alert("ERROR LINKING GL PROGRAM : " + info);
								throw new Error('Could not compile WebGL program. \n\n' + info);
							    }

      						});

		this.program = locProgram;

	    //enable and link shader attributes
	    	gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "inPosition"));

		gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "inNormal"));

		var uvsLoc = gl.getAttribLocation(this.program, "inUV");
		if (uvsLoc != -1) {
			gl.enableVertexAttribArray(uvsLoc);
		        this.textureLoc = gl.getUniformLocation(this.program, "uTexture");
		}		

	}

	//activates this shader
	use()
	{
		gl.useProgram(this.program);
	}

	//getters for attributes locations
    getPositionsLocation()		{ return gl.getAttribLocation(this.program, "inPosition"); }
    getNormalsLocation()		{ return gl.getAttribLocation(this.program, "inNormal"); }
    getUVsLocation()			{ return gl.getAttribLocation(this.program, "inUV"); }
    getMatrixLocation()			{ return gl.getUniformLocation(this.program, "worldProjectionMatrix"); }
    getWorldViewMatrixLocation()			{ return gl.getUniformLocation(this.program, "worldViewMatrix"); }
    getNormalMatrixLocation()	{ return gl.getUniformLocation(this.program, "nMatrix"); }
    getTextureLocation()		{return gl.getUniformLocation(this.program, "uTexture");}
    getUniformLocation(locationName) {
	return gl.getUniformLocation(this.program, locationName);}

}

