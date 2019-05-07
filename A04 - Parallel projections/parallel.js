function parallel() {
	// Build a parallel projection matrix, for a 16/9 viewport, with halfwidt w=40, near plane n=1, and far plane f=101.
	var out = [1/40,		0.0,		0.0,		0.0,
		   0.0,		(16/9)/40,		0.0,		0.0,
		   0.0,		0.0,		-2/(101-1),		-(102)/(100),
			   0.0,		0.0,		0.0,		1.0];

	return out;
}

