function perspective() {
	// Build a perspective projection matrix, for a 16/9 viewport, with fov-y=90, near plane n=0.1, and far plane f=100.
    const a = 16/9
    const n = 0.1
    const f = 100
    var fovy = utils.degToRad(90);
    var out = [1/a * Math.tan(fovy/2),		0.0,		0.0,		0.0,
	       0.0,		1/Math.tan(fovy/2),		0.0,		0.0,
	       0.0,		0.0,		(f + n)/(n - f),		2 * f * n / ( n - f ),
			   0.0,		0.0,		-1,		0.0];

	return out;
}

