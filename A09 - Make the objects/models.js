function buildGeometry() {
    var i;
    var i2;
    
    // Draws a pyramid
    var vert1 = [[-1.0,-1.0,0.0], [1.0,-1.0,0.0], [0.0,1.0,1],
		 [-1, -1.0, 2], [1, -1, 2]];
    var ind1 = [0, 2, 1,
		0, 1, 4,
		0, 4, 3,
		1, 2, 4,
		3, 2, 0,
		4, 2, 3
	       ];
    var color1 = [1.0, 0.0, 0.0];
    addMesh(vert1, ind1, color1);

    // Draws a cube
    var vert2 = [[-1.0,-1.0,0.0], [1.0,-1.0,0.0], [-1.0,1.0,0.0], [1.0,1.0,0.0],
		 [-1.0,-1,2], [1,-1,2], [-1,1,2],[1,1,2]]
    var ind2 = [0, 2, 1, 1, 2, 3,
		1, 3, 5, 5, 3, 7,
		0, 4, 2, 4, 6, 2,
		1, 5, 0, 5, 4, 0,
		2, 6, 7, 3, 2, 7,
		5, 7, 4, 6, 4, 7
	       ];
    var color2 = [0.0, 0.0, 1.0];
    addMesh(vert2, ind2, color2);

    // Draws a Monopoly house
    var vert3 = [[-1.0,-1.0,-1], [1.0,-1.0,-1], [1.0,1.0,-1], [-1.0,1.0,-1],
		 [0.0,2, 0],
		 [-1.0,-1.0,1], [1.0,-1.0,1], [1.0,1.0,1], [-1.0,1.0, 1]];
    var ind3 = [0, 2, 1,
		0, 3, 2,
		3, 4, 2, // front side
		1, 2, 7,
		1, 7, 6,
		2, 4, 7,
		5, 8, 0,
		8, 3, 0,
		8, 4, 3,// left and right sides
		1, 6, 0,
		6, 5, 0, // bottom side
		6, 7, 5,
		7, 8, 5,
		7, 4, 8, // back side		
	       ];
    var color3 = [0.0, 1.0, 0.0];
    addMesh(vert3, ind3, color3);
    
    // Draws a Cone
    var vert4 = [[0.0, 0.0, 0.0]];
    var ind4 = [];
    var color4 = [1.0, 1.0, 0.0];
    var slices4 = 10;
    for(i = 0; i < slices4; i++) {
	vert4[i+1] = [Math.cos(2*Math.PI / slices4 * i), 0.0 ,Math.sin(2*Math.PI / slices4 * i) ];
	ind4[3*i]   = 0;
	ind4[3*i+1] = i+1;
	ind4[3*i+2] = (i < slices4-1) ? i+2 : 1 ;
    }
    i++;
    vert4[i] = [0, 2, 0];
    for (i2=0; i2< slices4; i2++) {	
    	ind4[3*i2 + 3*i ]    = (i2 < slices4-1) ? i2 + 2 : 1 ;
    	ind4[3*i2 + 3*i + 1] =  i2 + 1;
    	ind4[3*i2 + 3*i + 2] = i;
    }
    addMesh(vert4, ind4, color4);

    // Draws a Cylinder
    var vert5 = [[0.0, -1, 0.0], [0,1,0]];
    var ind5 = [];
    var color5 = [1.0, 0.0, 1.0];
    var slices5 = 64;
    for(i = 0; i < slices5*2; i=i+2) {
	// bottom circle
	vert5[i+2] = [Math.cos(2*Math.PI / slices5 * (i/2)), -1, Math.sin(2*Math.PI / slices5 * (i/2))];
	ind5[12*i/2]   = 0;
	ind5[12*i/2 +1] = i+2;
	ind5[12*i/2 +2] = (i < slices5*2-3) ? i+4 : 2 ;
	// side
	ind5[12*i/2 + 3]   = i+2 ;
	ind5[12*i/2 + 4]   = i+3 ;
	ind5[12*i/2 + 5]   = (i < slices5*2-3) ? i+4 : 2 ;
	ind5[12*i/2 + 6]   = i+3;
	ind5[12*i/2 + 7]   = (i < slices5*2-4) ? i+5 : 3 ;
	ind5[12*i/2 + 8]   = (i < slices5*2-3) ? i+4 : 2 ;
	//top circle
	vert5[i+3] = [Math.cos(2*Math.PI / slices5 * (i/2)), 1, Math.sin(2*Math.PI / slices5 * (i/2))];
	ind5[12*i/2 + 9]   = (i < slices5*2-4) ? i+5 : 3; // swapped because back-face culling
	ind5[12*i/2 + 10] = i+3;
	ind5[12*i/2 + 11] = 1 ;

    }	
    addMesh(vert5, ind5, color5);

    // Draws a Sphere
    var vert6 = [[0,0,0]];
    var ind6 = [];
    var color6 = [0.0, 1.0, 1.0];
    var slices6 = 50;
    var strips6 = 20;
    var ray6 = 2;
    vert6[1] = [0, ray6,0];
    var currentRay = ray6 * Math.cos(Math.PI/2 - Math.PI / strips6 * 1); 
    var currentHeight = ray6 * Math.sin(Math.PI/2 - Math.PI/strips6 * 1 );
    var prevStartVertexIndex = 2;
    var fillVertexIndex = 2; // from  which we can start to add vertices
    var fillIndexIndex = 0; // from which we can start to add indexes
    for(i = 0; i < slices6; i++) {
	// top
	vert6[i+fillVertexIndex] = [currentRay * Math.cos(2*Math.PI / slices6 * i), currentHeight , currentRay * Math.sin(2*Math.PI / slices6 * i)];
	ind6[fillIndexIndex + 3*i]   = (i < slices6 - 1) ? i+fillVertexIndex+1 : fillVertexIndex  ;
	ind6[fillIndexIndex + 3*i + 1] = i+fillVertexIndex;
	ind6[fillIndexIndex + 3*i + 2] = 1;
    }    
    fillIndexIndex = i*3; // added index for this cycle
    prevStartVertexIndex = fillVertexIndex ; // store where the previous circle start
    fillVertexIndex = fillVertexIndex + i; // added vertices for this cycle
    var j;
    for (j = 1; j < strips6-1; j++) {
    	i2 = 0;
    	currentRay = ray6 * Math.cos(Math.PI/2 -  Math.PI / strips6 * (j+1) ); 
    	currentHeight = ray6 *  Math.sin(Math.PI/2 - Math.PI/strips6 * (j+1) );
    	while( i2 < slices6 ) {	
    	    vert6[fillVertexIndex + i2 ] = [currentRay * Math.cos(2*Math.PI / slices6 * i2), currentHeight , currentRay * Math.sin(2*Math.PI / slices6 * i2)];
    	    ind6[fillIndexIndex + 6*i2    ] = (i2 < slices6 - 1) ? prevStartVertexIndex + 1 + i2 : prevStartVertexIndex ;
    	    ind6[fillIndexIndex + 6*i2 + 1] = fillVertexIndex + i2 ;
    	    ind6[fillIndexIndex + 6*i2 + 2] = prevStartVertexIndex + i2 ;
    	    ind6[fillIndexIndex + 6*i2 + 3] = (i2 < slices6 - 1) ? prevStartVertexIndex + 1 + i2 : prevStartVertexIndex  ;
    	    ind6[fillIndexIndex + 6*i2 + 4] =  (i2 < slices6 - 1) ? fillVertexIndex + i2 + 1   : fillVertexIndex ;
    	    ind6[fillIndexIndex + 6*i2 + 5] = fillVertexIndex + i2 ;
    	    i2++;
    	}
    	prevStartVertexIndex = fillVertexIndex;
    	fillVertexIndex = fillVertexIndex + i2;
    	fillIndexIndex = fillIndexIndex + i2 * 6;
    }
    vert6[fillVertexIndex]= [0,-ray6,0];
    fillVertexIndex++;
    currentRay = ray6 * Math.cos(-Math.PI/2 + Math.PI / strips6 ); 
    currentHeight = ray6 * Math.sin(-Math.PI/2 + Math.PI/strips6);
    for(i = 0; i < slices6; i++) {
	// bottom
	vert6[i+fillVertexIndex] = [currentRay * Math.cos(2*Math.PI / slices6 * i), currentHeight , currentRay * Math.sin(2*Math.PI / slices6 * i)];
	ind6[fillIndexIndex + 3*i]   = fillVertexIndex-1;
	ind6[fillIndexIndex + 3*i + 1] = i+fillVertexIndex;
	ind6[fillIndexIndex + 3*i + 2] =  (i < slices6 - 1) ? i+fillVertexIndex+1 : fillVertexIndex  ;
    }    

    addMesh(vert6, ind6, color6);
}

