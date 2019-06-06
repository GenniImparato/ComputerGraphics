class Mesh
{
	//factory for creating mesh from .obj file
	static loadFromOBJFile(modelFile, boundingBoxesFile)
	{
		var modelObj, bBoxObj;

		//load model
		utils.loadFile(OBJModelsDir + modelFile, 0, 
							function (fileText) 
							{
      							modelObj = new OBJ.Mesh(fileText);
      							OBJ.initMeshBuffers(gl, modelObj);
      						});

		var bBoxesPositions = null;
		var bBoxesIndices = null;

		if(boundingBoxesFile)
		{
			//load bounding boxes
			utils.loadFile(OBJModelsDir + boundingBoxesFile, 0, 
							function (fileText) 
							{
      							bBoxObj = new OBJ.Mesh(fileText);
      							bBoxesPositions = bBoxObj.vertices;
      							bBoxesIndices = bBoxObj.indices;
      						});
		}
		

		return new Mesh(modelObj.vertices, modelObj.vertexBuffer,
						modelObj.normalBuffer,
						modelObj.textureBuffer,
						modelObj.indexBuffer, 
						bBoxesPositions, bBoxesIndices);
	}

	//creates a mesh  
	constructor(positions, positionBuffer, normalBuffer, textCoordBuffer, indexBuffer, bBoxesPositions, bBoxesIndices)
	{
		this.positions = positions;
		this.positionBuffer = positionBuffer;
		this.normalBuffer = normalBuffer;
		this.textCoordBuffer = textCoordBuffer;
		this.indexBuffer = indexBuffer;
		this.bBoxesPositions = bBoxesPositions;
		this.bBoxesIndices = bBoxesIndices;
	}

	//draws the mesh
    render(worldMatrix, shader)
	{
		shader.use();

		var matrix =  utils.multiplyMatrices(projectionMatrix, worldMatrix); // world matrix
		gl.uniformMatrix4fv(shader.getMatrixLocation(), gl.FALSE, utils.transposeMatrix(matrix));

	    var WVMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix); // world view matrix 
	    var nMatrix = utils.invertMatrix(utils.transposeMatrix(WVMatrix));
	    gl.uniformMatrix4fv(shader.getWorldViewMatrixLocation(), gl.FALSE, utils.transposeMatrix(WVMatrix));
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
