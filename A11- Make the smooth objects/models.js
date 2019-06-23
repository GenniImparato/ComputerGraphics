function buildGeometry() {
	var i;
	
	// Draws a cube
    var vert1 = [[-1.0,-1.0,1.0], [1.0,-1.0,1.0], [1.0,1.0,1.0], [-1.0,1.0,1.0], 
		 [1.0,-1.0,1.0], [1.0,1.0,1.0], [1.0,1.0,-1.0], [1.0,-1.0,-1.0], // Right
		 [-1.0,-1.0,1.0], [-1.0,1.0,1.0], [-1.0,1.0,-1.0], [-1.0,-1.0,-1.0], // Left
		 [-1.0,-1.0,-1.0], [1.0,-1.0,-1.0], [1.0,1.0,-1.0], [-1.0,1.0,-1.0], // Back
		 [-1.0, -1.0, 1.0], [-1.0, -1.0, -1.0], [1.0, -1.0, 1.0], [1.0, -1.0, -1.0], // Bottom
		 [-1.0, 1.0, 1.0], [-1.0, 1.0, -1.0], [1.0, 1.0, 1.0], [1.0, 1.0, -1.0] // Up
		];
    var norm1 = [[ 0.0, 0.0,1.0], [0.0, 0.0,1.0], [0.0,0.0,1.0], [ 0.0,0.0,1.0],
		 [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0],
		 [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0],
		 [ 0.0, 0.0,-1.0], [0.0, 0.0,-1.0], [0.0,0.0,-1.0], [ 0.0,0.0,-1.0],
		 [ 0.0, -1.0, 0.0], [ 0.0, -1.0, 0.0], [ 0.0, -1.0, 0.0], [ 0.0, -1.0, 0.0],
		 [ 0.0, 1.0, 0.0], [ 0.0, 1.0, 0.0], [ 0.0, 1.0, 0.0], [ 0.0, 1.0, 0.0]
		];
    var ind1 = [0, 1, 2,  0, 2, 3,
	        4, 6, 5, 4, 7, 6,
	        8, 9, 10, 8, 10, 11,
		12,14, 13, 12, 15, 14,
		16, 17, 18, 17, 19, 18,
		20, 22, 21, 21, 22, 23
	       ];
	var color1 = [0.0, 0.0, 1.0];
	addMesh(vert1, norm1, ind1, color1);
	
	// Draws a Cylinder
    var vert2 = [[0.0, -1.0, 0.0], [0.0, 1.0, 0.0]];
    var norm2 = [[0.0, -1.0, 0.0], [0.0, 1.0, 0.0]];
	var ind2 = [];
	var color2 = [1.0, 0.0, 1.0];
	var slices2 = 10;
    var lastFreeVertex = 0;
    var lastFreeIndex = 0;
    for(i = 0; i < slices2*4; i=i+4) { // I add 4 vertex per cycle
	// bottom circle
	vert2[i+2] = [Math.cos(2*Math.PI / slices2 * (i/4)), -1, Math.sin(2*Math.PI / slices2 * (i/4))];
	norm2[i+2] = [0.0, -1.0, 0.0];
	vert2[i+3] = [Math.cos(2*Math.PI / slices2 * (i/4)), -1, Math.sin(2*Math.PI / slices2 * (i/4))];
	norm2[i+3] = [Math.cos(2*Math.PI / slices2 * (i/4)), 0, Math.sin(2*Math.PI / slices2 * (i/4))];
	ind2[12*i/4]   = 0;
	ind2[12*i/4 +1] = i+2;
	ind2[12*i/4 +2] = (i+6 < slices2*4) ? i+6 : 2 ;
	// // side
	ind2[12*i/4 + 3]   =  i+3 ;
	ind2[12*i/4 + 4]   = i+4 ;
	ind2[12*i/4 + 5]   = (i+7 <= slices2*4) ? i+7 : 3;
	ind2[12*i/4 + 6]   = i+4;
	ind2[12*i/4 + 7]   = (i+8 <= slices2*4+1) ? i+8 : 4 ;
	ind2[12*i/4 + 8]   = (i+7 <= slices2*4) ? i+7 : 3 ;
	// //top circle
	vert2[i+4] = [Math.cos(2*Math.PI / slices2 * (i/4)), 1, Math.sin(2*Math.PI / slices2 * (i/4))];
	norm2[i+4] = [Math.cos(2*Math.PI / slices2 * (i/4)), 0.0, Math.sin(2*Math.PI / slices2 * (i/4))];
	vert2[i+5] = [Math.cos(2*Math.PI / slices2 * (i/4)), 1, Math.sin(2*Math.PI / slices2 * (i/4))];
	norm2[i+5] = [0.0, 1.0, 0.0]
	ind2[12*i/4 + 9]   = (i+9 <= slices2*4+1) ? i+9 : 5; // swapped because back-face culling
	ind2[12*i/4 + 10] = i+5;
	ind2[12*i/4 + 11] = 1 ;

    }	
    addMesh(vert2, norm2, ind2, color2);

	
	// Draws a Cone
	var vert3 = [[0.0, 0.0, 0.0]];
	var norm3 = [[0.0, -1.0, 0.0]];
    var lastAddedIndex = 0;
    var lastAddedVertex = 0;
	var ind3 = [];
	var color3 = [1.0, 1.0, 0.0];
	var slices3 = 64;
    for(i = 0; i < slices3; i++) {
	vert3[i+1] = [Math.cos(2*Math.PI / slices3 * i), 0.0 ,Math.sin(2*Math.PI / slices3 * i) ];
	norm3[i+1] = [0.0, -1.0, 0.0];
	ind3[3*i]   = 0;
	ind3[3*i+1] = i+1;
	ind3[3*i+2] = (i+2 < slices3) ? i+2 : 1 ;
    }
    lastAddedIndex = i*3;
    i++;
    vert3[i] = [0, 2, 0];
    norm3[i] = [0, 0, 0];
    lastAddedVertex = i;
    for (i=0; i< slices3; i++) {	
	vert3[lastAddedVertex + i+1] = [Math.cos(2*Math.PI / slices3 * i), 0.0 ,Math.sin(2*Math.PI / slices3 * i) ];
	norm3[lastAddedVertex + i+1] = [Math.cos(2*Math.PI / slices3 * i), Math.sin(Math.PI / 4) ,Math.sin(2*Math.PI / slices3 * i) ];
    	ind3[lastAddedIndex + 3*i ]    = (i+2 < slices3) ? lastAddedVertex + i + 2 : lastAddedVertex + 1 ;
    	ind3[lastAddedIndex + 3*i + 1] = lastAddedVertex + i + 1;
    	ind3[lastAddedIndex + 3*i + 2] = lastAddedVertex;
    }
	addMesh(vert3, norm3, ind3, color3);

	// Draws a Sphere
    var vert4 = [[0,0,0]];
    var norm4 = [[0,0,0]];
    var ind4 = [];
    var color4 = [0.0, 1.0, 1.0];
    var slices4 = 20;
    var strips4 = 20;
    var ray4 = 2;
    vert4[1] = [0, ray4,0];
    norm4[1] = [0, 1, 0];
    var currentRay = ray4 * Math.cos(Math.PI/2 - Math.PI / strips4 * 1); 
    var currentHeight = ray4 * Math.sin(Math.PI/2 - Math.PI/strips4 * 1 );
    var prevStartVertexIndex = 2;
    var fillVertexIndex = 2; // from  which we can start to add vertices
    var fillIndexIndex = 0; // from which we can start to add indexes
    for(i = 0; i < slices4; i++) {
	// top
	vert4[i+fillVertexIndex] = [currentRay * Math.cos(2*Math.PI / slices4 * i), currentHeight , currentRay * Math.sin(2*Math.PI / slices4 * i)];
	norm4[i+fillVertexIndex] = [  Math.cos(2*Math.PI / slices4 * i), Math.sin(Math.PI/2 - Math.PI/strips4 * 1 ) ,  Math.sin(2*Math.PI / slices4 * i)];
	ind4[fillIndexIndex + 3*i]   = (i < slices4 - 1) ? i+fillVertexIndex+1 : fillVertexIndex  ;
	ind4[fillIndexIndex + 3*i + 1] = i+fillVertexIndex;
	ind4[fillIndexIndex + 3*i + 2] = 1;
    }    
    fillIndexIndex = i*3; // added index for this cycle
    prevStartVertexIndex = fillVertexIndex ; // store where the previous circle start
    fillVertexIndex = fillVertexIndex + i; // added vertices for this cycle
    var j;
    for (j = 1; j < strips4-1; j++) {
    	i2 = 0;
    	currentRay = ray4 * Math.cos(Math.PI/2 -  Math.PI / strips4 * (j+1) ); 
    	currentHeight = ray4 *  Math.sin(Math.PI/2 - Math.PI/strips4 * (j+1) );
    	while( i2 < slices4 ) {	
    	    vert4[fillVertexIndex + i2 ] = [currentRay * Math.cos(2*Math.PI / slices4 * i2), currentHeight , currentRay * Math.sin(2*Math.PI / slices4 * i2)];
    	    norm4[fillVertexIndex + i2 ] = [ Math.cos(2*Math.PI / slices4 * i2), Math.sin(Math.PI/2 - Math.PI/strips4 * (j+1) ) ,  Math.sin(2*Math.PI / slices4 * i2)];
    	    ind4[fillIndexIndex + 6*i2    ] = (i2 < slices4 - 1) ? prevStartVertexIndex + 1 + i2 : prevStartVertexIndex ;
    	    ind4[fillIndexIndex + 6*i2 + 1] = fillVertexIndex + i2 ;
    	    ind4[fillIndexIndex + 6*i2 + 2] = prevStartVertexIndex + i2 ;
    	    ind4[fillIndexIndex + 6*i2 + 3] = (i2 < slices4 - 1) ? prevStartVertexIndex + 1 + i2 : prevStartVertexIndex  ;
    	    ind4[fillIndexIndex + 6*i2 + 4] =  (i2 < slices4 - 1) ? fillVertexIndex + i2 + 1   : fillVertexIndex ;
    	    ind4[fillIndexIndex + 6*i2 + 5] = fillVertexIndex + i2 ;
    	    i2++;
    	}
    	prevStartVertexIndex = fillVertexIndex;
    	fillVertexIndex = fillVertexIndex + i2;
    	fillIndexIndex = fillIndexIndex + i2 * 6;
    }
    vert4[fillVertexIndex]= [0,-ray4,0];
    norm4[fillVertexIndex]= [0,-1,0];
    fillVertexIndex++;
    currentRay = ray4 * Math.cos(-Math.PI/2 + Math.PI / strips4 ); 
    currentHeight = ray4 * Math.sin(-Math.PI/2 + Math.PI/strips4);
    for(i = 0; i < slices4; i++) {
	// bottom
	vert4[i+fillVertexIndex] = [currentRay * Math.cos(2*Math.PI / slices4 * i), currentHeight , currentRay * Math.sin(2*Math.PI / slices4 * i)];
	norm4[i+fillVertexIndex] = [ Math.cos(2*Math.PI / slices4 * i), Math.sin(-Math.PI/2 + Math.PI/strips4) ,  Math.sin(2*Math.PI / slices4 * i)];
	ind4[fillIndexIndex + 3*i]   = fillVertexIndex-1;
	ind4[fillIndexIndex + 3*i + 1] = i+fillVertexIndex;
	ind4[fillIndexIndex + 3*i + 2] =  (i < slices4 - 1) ? i+fillVertexIndex+1 : fillVertexIndex  ;
    }    


	addMesh(vert4, norm4, ind4, color4);
}

