function perspective(w, h, fov) {
	// Build a perspective projection matrix, for a viewport whose size is determined by parameters w (width) and h (height), and whose fov-y is passed in parameter fov. Near plane is n=0.1, and far plane f=100.
    var a = w/h;
    const n = 0.1
    const f = 100
    console.log(fov)
    var fovy = utils.degToRad(fov)
    var out = [1/(a* Math.tan(fovy/2)),		0.0,		0.0,		0.0,
	       0.0,		1/Math.tan(fovy/2),		0.0,		0.0,
	       0.0,		0.0,		(f + n)/(n - f),		2 * f * n / ( n - f ),
			   0.0,		0.0,		-1,		0];

	return out;
}

