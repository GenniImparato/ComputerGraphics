// these global variables are used to contain the current angles of the world
var worldQuaternion = Quaternion.fromEuler(0,0,0); // Starting quaternion : no rotation 

function quaternionFromEuler( rx, ry, rz ) {
    var xQuaternion = new Quaternion({w: Math.cos(rx/2), x: Math.sin(rx/2), y: 0, z: 0});
    var yQuaternion = new Quaternion({w: Math.cos(ry/2), y: Math.sin(ry/2), x: 0, z: 0});
    var zQuaternion = new Quaternion({w: Math.cos(rz/2), z: Math.sin(rz/2), y: 0, x: 0});

    return zQuaternion.mul(xQuaternion.mul(yQuaternion));
}

function quaternionFromAngularVelocity(rvx, rvy, rvz) {
    var angle = Math.sqrt(rvx * rvx + rvy * rvy + rvz * rvz);
    if (angle > 0) {
	return new Quaternion({w: Math.cos(angle/2),
			       x: rvx * Math.sin(angle/2) / angle ,
			       y: rvy * Math.sin(angle/2) / angle ,
			       z: rvz * Math.sin(angle/2) / angle});
    } else {
	return new Quaternion(1,0,0,0);
    }
}

// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the -1 .. +1 range that tells the angular velocity of the world.
function updateWorld(rvx, rvy, rvz) {
	// updates the angles
    var deltaQuaternion = quaternionFromEuler(utils.degToRad(rvx), utils.degToRad(rvy), utils.degToRad(rvz));

    var rotQuat = worldQuaternion;
    worldQuaternion = worldQuaternion.mul(rotQuat.inverse());
    worldQuaternion = worldQuaternion.mul(deltaQuaternion);
    worldQuaternion = worldQuaternion.mul(rotQuat);

	// compute the rotation matrix
    var out =  worldQuaternion.toMatrix4();			   				      
	return out;
}

