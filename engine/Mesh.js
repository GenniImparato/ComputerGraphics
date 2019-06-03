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
    render(worldMatrix, shader)
	{
		shader.use();

		var matrix =  utils.multiplyMatrices(projectionMatrix, worldMatrix); // world matrix
		gl.uniformMatrix4fv(shader.getMatrixLocation(), gl.FALSE, utils.transposeMatrix(matrix));

	    var WVMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix); // world view matrix 
	    var nMatrix = utils.invertMatrix(utils.transposeMatrix(WVMatrix));
		gl.uniformMatrix4fv(shader.getNormalMatrixLocation(), gl.FALSE, utils.transposeMatrix(nMatrix));

		//positions
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.vertexAttribPointer(shader.getPositionsLocation(), this.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

		//normals
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		gl.vertexAttribPointer(shader.getNormalsLocation(), this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

		//uv
		gl.bindBuffer(gl.ARRAY_BUFFER, this.textCoordBuffer);
		gl.vertexAttribPointer(shader.getUVsLocation(), this.textCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

	    

		//rendering
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

	}
}
