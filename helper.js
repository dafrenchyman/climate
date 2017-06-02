// This javascript contains a bunch of useful functions

/***
 * Degree to Radian
 * @param degrees
 * @returns {number}
 */
function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

/***
 * Multiply a mat4 by a vec3
 * @param out
 * @param mat_in
 * @param vec_in
 * @returns {*}
 */
mat4.multiplyVec3 = function (out, mat_in, vec_in) {
	//var out = vec3.create() || (out = vec_in);
	var d = vec_in[0], e = vec_in[1], f = vec_in[2];
	out[0] = mat_in[0] * d + mat_in[4] * e + mat_in[8] * f + mat_in[12];
	out[1] = mat_in[1] * d + mat_in[5] * e + mat_in[9] * f + mat_in[13];
	out[2] = mat_in[2] * d + mat_in[6] * e + mat_in[10] * f + mat_in[14];
	return out
};

/***
 * Convert a mat4 to mat3 (just select the 3x3 top left of the matrix
 * @param out
 * @param a
 * @returns {*|Type}
 */
mat4.toMat3 = function(out,a) {
	var out = new glMatrix.ARRAY_TYPE(9);
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[4];
	out[4] = a[5];
	out[5] = a[6];
	out[6] = a[8];
	out[7] = a[9];
	out[8] = a[10];
	return out;
};

function GetDatasetById(id) {
	for (var i = 0; i < MenuData.length; i++) {
		if (MenuData[i].hasOwnProperty("Dataset_ID")) {
			var currDataset = MenuData[i];
			if (currDataset.Dataset_ID == id) {
				return currDataset;
			}
		}
	}
}

function GetDatasetByStore(databaseStore) {
	for (var i = 0; i < MenuData.length; i++) {
		if (MenuData[i].hasOwnProperty("FullName")) {
			var currDataset = MenuData[i];
			if (currDataset.DatabaseStore == databaseStore) {
				return currDataset;
			}
		}
	}
}

/***
 * This function creates the Dataset Selection jqueryUI menu system
 * Function comes from slightly modifying:
 * http://stackoverflow.com/questions/18184380/create-a-dynamic-unordered-list-using-a-javascript-function
 * @param data
 * @returns {*}
 */
function generateList(data) {
	var i, item, ref = {}, counts = {};

	function ul() {
		return document.createElement('ul');
	}

	function li(element) {
		var e = document.createElement('li');
		if (!element.hasOwnProperty('DatabaseStore')) {
			e.appendChild(document.createTextNode(element['name']));
		} else {
			e.appendChild(document.createElement('div'));
			e.childNodes[0].setAttribute('DatabaseStore', element.DatabaseStore);
			e.childNodes[0].appendChild(document.createTextNode(element['name']));
		}
		return e;
	}

	ref[0] = ul();
	ref[0].setAttribute("id", "datasetMenu");
	counts[0] = 1;
	for (i = 0; i < data.length; ++i) {
		var currNode = ref[data[i].parentId].appendChild(li(data[i])); // create <li>
		ref[data[i].id] = ul(); // assume + create <ul>
		//ref[data[i].parentId].appendChild(ref[data[i].id]);
		currNode.appendChild(ref[data[i].id]);
		counts[data[i].id] = 0;
		counts[data[i].parentId] += 1;
	}
	for (i in counts) {// for every <ul>
		if (counts[i] === 0) {// if it never had anything appened to it
			ref[i].parentNode.removeChild(ref[i]); // remove it
			//ref[data[i].id].setAttribute("dbName", data[i].DatabaseStore);
		}
	}
	return ref[0];
}

function padLeft(nr, n, str){
	return Array(n-String(nr).length+1).join(str||'0')+nr;
}

//or as a Number prototype method:
Number.prototype.padLeft = function (n,str){
	return Array(n-String(this).length+1).join(str||'0')+this;
}

function CelsiusToFahrenheit(celsius) {
	return celsius*(9/5) + 32;
}

function FahrenheitToCelsius(fahrenheit) {
	return (fahrenheit - 32)*(5/9);
}

function KelvinToCelsius(kelvin) {
	return (kelvin - 273.15);
}

function ProcessRawDataValue(rawValues) {
	valueFinal = [];
	switch (LayerSettings.DataUnits) {
		case 'Kelvins':
		case 'degK':
			switch (LayerSettings.TemperatureType) {
				case 'C':
					for (var i = 0; i < rawValues.length; i++) {
						valueFinal.push(KelvinToCelsius(rawValues[i]));
					}
					break;
				default :
					valueFinal = rawValues;
			}
			break;
		default :
			valueFinal = rawValues;
	}
	return(valueFinal);
}

function cartesianToSphere(lonInRad, latInRad, radius) {
	var theta = lonInRad;
	var phi = latInRad;
	var sinTheta = Math.sin(theta);
	var cosTheta = Math.cos(theta);
	var sinPhi = Math.sin(phi);
	var cosPhi = Math.cos(phi);

	// Normals
	var x = cosPhi * cosTheta;
	var y = cosPhi * sinTheta;
	var z = sinPhi;

	// Tangent
	var tanRotMatrix = mat4.create();
	var normal = vec3.create();
	var tangent = vec3.create();
	normal[0] = x;
	normal[1] = y;
	normal[2] = z;
	mat4.rotate(tanRotMatrix, tanRotMatrix, degToRad(90), [0, 0, 1]);
	mat4.multiplyVec3(tangent, tanRotMatrix, normal);

	// BiTangent
	var biTangent = vec3.create();
	var biTanRotMatrix = mat4.create();
	mat4.rotate(biTanRotMatrix, biTanRotMatrix, degToRad(-90), normal);
	mat4.multiplyVec3(biTangent, biTanRotMatrix, tangent);

	var values = {
		coordinates: {x: radius * x, y: radius * y, z: radius * z},
		normals: {x: x, y: y, z: z},
		tangents: {x: tangent[0], y: tangent[1], z: tangent[2]},
		biTangents: {x: biTangent[0], y: biTangent[1], z: biTangent[2]}
	};

	return values;
}

// Unproject the canvas (x,y) to coordinates in the "world." Z values is the depth into the world. You'll need to call this
// function twice to get a "ray" in the world that is then usable.
function Unproject(winx, winy, winz, viewportWidth, viewPortHeight, pMatrix, vMatrix) {

	// This was a pain. Eventually found this site: http://trac.bookofhook.com/bookofhook/trac.cgi/wiki/MousePicking
	// and just went through the math piece by piece.

	// Clipping coordinates
	var n = vec4.create();
	n[0] = (2*winx)/viewportWidth - 1.0;
	n[1] = -1*((2*winy)/viewPortHeight - 1.0);
	n[2] = 2.0*winz-1.0;
	n[3] = 1.0;

	// Viewspace Values
	var viewspaceMatrix = mat4.create();
	mat4.copy(viewspaceMatrix, pMatrix);
	mat4.invert(viewspaceMatrix, viewspaceMatrix);

	// Clipping space to viewspace
	var viewspaceVector = vec4.create();
	mat4.multiply(viewspaceVector, viewspaceMatrix, n);

	viewspaceVector[0] = viewspaceVector[0]/viewspaceVector[3];
	viewspaceVector[1] = viewspaceVector[1]/viewspaceVector[3];
	viewspaceVector[2] = viewspaceVector[2]/viewspaceVector[3];
	viewspaceVector[3] = 1.0;

	// Viewspace to Modelspace
	var viewMatrix = mat4.create();
	mat4.copy(viewMatrix, vMatrix);
	mat4.invert(viewMatrix, viewMatrix);

	var out = vec4.create();
	mat4.multiply(out, viewMatrix, viewspaceVector);
	return out;
}

//
// From http://geomalgorithms.com/a06-_intersect-2.html
function TriangleIntersection(V0, V1, V2, P0, P1) {
	var  SMALL_NUM = 0.00000001;
	returnValue = {
		intersects: false,
		point: null
	};

	var u = vec3.create(), v = vec3.create(), n = vec3.create();              // triangle vectors
	var dir = vec3.create(), w0 = vec3.create(), w = vec3.create();           // ray vectors
	var r, a, b;              // params to calc ray-plane intersect
	var I = vec3.create();

	// get triangle edge vectors and plane normal
	vec3.sub(u, V1, V0);
	vec3.sub(v, V2, V0);
	vec3.cross(n, u, v);              			// cross product
	if (n[0] == 0 && n[1] == 0 && n[2] == 0)    // triangle is degenerate
	{
		//return -1;							// do not deal with this case
		return returnValue;
	}

	vec3.sub(dir, P1, P0);              		// ray direction vector
	vec3.sub(w0, P0, V0);
	a = -1.0 * vec3.dot(n,w0);
	b = vec3.dot(n,dir);
	if (Math.abs(b) < SMALL_NUM) {     			// ray is  parallel to triangle plane
		if (a == 0)                 			// ray lies in triangle plane
		{
			//return 2;
			return returnValue;
		}
		else {
			//return 0;							// ray disjoint from plane
			return returnValue;
		}
	}

	// get intersect point of ray with triangle plane
	r = a / b;
	if (r < 0.0)                    // ray goes away from triangle
	{
		//return 0;					// => no intersect
		return returnValue;
	}
	// for a segment, also test if (r > 1.0) => no intersect

	rvec = vec3.create();
	rvec[0] = r;
	rvec[1] = r;
	rvec[2] = r;
	var I1 = vec3.create();
	vec3.multiply(I1, rvec, dir);
	vec3.add(I, P0, I1);            // intersect point of ray and plane

	// is I inside T?
	var uu, uv, vv, wu, wv, D;
	uu = vec3.dot(u,u);
	uv = vec3.dot(u,v);
	vv = vec3.dot(v,v);
	w = vec3.sub(w, I, V0);
	wu = vec3.dot(w,u);
	wv = vec3.dot(w,v);
	D = uv * uv - uu * vv;

	// get and test parametric coords
	var s, t;
	s = (uv * wv - vv * wu) / D;
	if (s < 0.0 || s > 1.0) {         // I is outside T
		//return 0;
		return returnValue;
	}
	t = (uv * wu - uu * wv) / D;
	if (t < 0.0 || (s + t) > 1.0) {  // I is outside T
		//return 0;
		return returnValue;
	}
	returnValue.intersects = true;
	var out = vec3.create();
	out = I;
	returnValue.point = out;

	//return 1;                       // I is in T
	return returnValue;
}

Array.prototype.max = function() {
	return Math.max.apply(null, this);
};

Array.prototype.min = function() {
	return Math.min.apply(null, this);
};

Array.prototype.contains = function(v) {
	for(var i = 0; i < this.length; i++) {
	    if(this[i] === v) return true;
	}
	return false;
};

Array.prototype.unique = function() {
	var arr = [];
	for(var i = 0; i < this.length; i++) {
	    if(!arr.contains(this[i])) {
	        arr.push(this[i]);
	    }
	}
	return arr; 
};

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};