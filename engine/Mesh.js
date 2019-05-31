class Mesh
{
	//factory for creating mesh from .obj file
	static loadFromOBJFile(file)
	{
		var obj;

		utils.loadFile(OBJModelsDir + file, 0, 
							function (fileText) 
							{
      							obj = new OBJ.Mesh(fileText);
      							OBJ.initMeshBuffers(gl, obj);
      						});

		return new Mesh(obj.vertices, obj.vertexBuffer,
						obj.normalBuffer,
						obj.textureBuffer,
						obj.indexBuffer);
	}

	//creates a mesh 
	constructor(positions, positionBuffer, normalBuffer, textCoordBuffer, indexBuffer)
	{
		this.positions = positions;
		this.positionBuffer = positionBuffer;
		this.normalBuffer = normalBuffer;
		this.textCoordBuffer = textCoordBuffer;
		this.indexBuffer = indexBuffer;
	}

	//draws the mesh
	render(shader, worldMatrix)
	{
		shader.use();

		var matrix =  utils.multiplyMatrices(projectionMatrix, worldMatrix); // world matrix
		gl.uniformMatrix4fv(shader.getMatrixLocation(), gl.FALSE, utils.transposeMatrix(matrix));

		var nMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix); // world view matrix 
		gl.uniformMatrix4fv(shader.getNormalMatrixLocation(), gl.FALSE, utils.transposeMatrix(nMatrix));

		//positions
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.vertexAttribPointer(shader.getPositionsLocation(), this.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

		//normals
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		gl.vertexAttribPointer(shader.getNormalsLocation(), this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

	    // lightDirection
	    var lightDir = light.getLightDirection();
	    var lightDirMatrix = utils.invertMatrix3(utils.sub3x3from4x4(worldMatrix));
	    lightDir = utils.multiplyMatrix3Vector3(lightDirMatrix, lightDir);
	    light.setLightDirection(lightDir[0], lightDir[1], lightDir[2]);

	    // lightPosition
	    var lightPos = light.getLightDirection();
	    var lightPosMatrix = utils.invertMatrix(worldMatrix);
	    lightPos = utils.multiplyMatrixVector(lightPosMatrix, [lightPos, 1.0]);
	    light.setLightPosition(lightPos[0], lightPos[1], lightPos[2]);

	    light.bind();
	    

		//rendering
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

	}
}
