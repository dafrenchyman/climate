/**
 * Created by mrsharky on 11/5/16.
 */

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var xMovement = 0;
var yMovement = 0;
var zoomLevel = 80;
var globeDistance = -250.0;
var EarthRadius = 80;

function onMenu(){
	inMenu = true;
	var element = $("#effect");
	element.css("opacity", "0.9");
	element.css("filter","alpha(oppacity=90)"); // IE Fallback
}

function offMenu(){
	inMenu = false;
	var element = $("#effect");
	element.css("opacity", "0.5");
	element.css("filter","alpha(oppacity=50)"); // IE Fallback
}

function handleMouseWheel(event) {
	event.preventDefault();
	test = event;
	var maxZoom = -75;
	if (displaySettings.globeView == "3d" || displaySettings.globeView == "ortho") {
		maxZoom = 2;
	}
	{
		zoomLevel = zoomLevel + (-event.deltaY / 20);
		var currZoom = -globeDistance - EarthRadius - maxZoom;
		if (displaySettings.globeView == "ortho") {
			if (zoomLevel > -5) {
				zoomLevel = -5;
				if (zoomLevel < (globeDistance * 2)) {
					zoomLevel = (globeDistance * 2);
				}
			}
		} else {
			if (zoomLevel > currZoom) {
				zoomLevel = currZoom;
			}
			if (zoomLevel < (globeDistance * 2)) {
				zoomLevel = (globeDistance * 2);
			}
		}
	}

	var uri = new URI(window.location.href);
	uri.removeSearch("zoom");
	uri.addSearch("zoom", zoomLevel);
	window.history.replaceState("", "", uri.search());
}

function handleMouseDown(event) {
	event.preventDefault();
	mouseDown = true;
	if (event.type == "mousedown") {// && displaySettings.globeView)
		lastMouseX = event.clientX; // + event.touches[0].clientX;
		lastMouseY = event.clientY; // + event.touches[0].clientY;
	}
	else if (event.type == "touchstart") {
		var touch = event.touches[0] || event.changedTouches[0];
		lastMouseX = touch.pageX;
		lastMouseY = touch.pageY;
	}
}

function handleMouseUp(canvas, event) {
	mouseDown = false;
	if (!MouseDragging && document.getElementById("canvas-align").style.display == "block" && !inMenu) {
		// Need to reproject the canvas (x,y) into a "ray" going through the "world"
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;

		//mat4.inverse(vMatrix, vMatrix);

		var widthToHeight = gl.viewportWidth / gl.viewportHeight;

		// Calculate click projection (for Unproject to work, needs to be negative farfield)
		// TODO: Need to correct the Unproject to work for positive far field, so this section could be skipped
		if (displaySettings.globeView == "ortho") {
			var orthoZoom = -1 * zoomLevel / (80.0 * 2.0);
			mat4.ortho(pMatrix, (-widthToHeight * 80) * orthoZoom, (widthToHeight * 80) * orthoZoom
				, (-1 * 80) * orthoZoom, (1 * 80) * orthoZoom, 1000, -1000.0);
			mat4.identity(mvMatrix);
			mat4.translate(mvMatrix, mvMatrix, [xMovement, yMovement, globeDistance + zoomLevel]);
			mat4.multiply(mvMatrix, mvMatrix, earthRotationMatrix);
			mat4.rotate(mvMatrix, mvMatrix, degToRad(-90), [1, 0, 0]);
			mat4.copy(vMatrix, mvMatrix);
		}

		var vec1 = Unproject(x, y, 0, gl.viewportWidth, gl.viewportHeight, pMatrix, vMatrix);
		var vec2 = Unproject(x, y, 1, gl.viewportWidth, gl.viewportHeight, pMatrix, vMatrix);

		// Origin vector as vec3
		var origin = vec3.create();
		origin[0] = vec1[0];
		origin[1] = vec1[1];
		origin[2] = vec1[2];

		// Direction vector as vec3
		var direction = vec3.create();
		direction[0] = vec2[0];
		direction[1] = vec2[1];
		direction[2] = vec2[2];

		var points = [];
		points.push(vec1);
		points.push(vec2);

		//lineSegmentBuffers(points);

		// Loop through all of the Triangles that make up the sphere to find which triangles the "ray" intersects with
		var intersectionPoints = [];
		var triangleCounter = 0;
		while (triangleCounter < SphereTriangles.length) {
			var v0 = SphereTriangles[triangleCounter++];
			var v1 = SphereTriangles[triangleCounter++];
			var v2 = SphereTriangles[triangleCounter++];

			var calc = TriangleIntersection(v0, v1, v2, direction, origin);
			if (calc.intersects) {
				intersectionPoints.push(calc.point);
			}
		}

		// Calculate which intersection is closest to the camera (we can have two intersections on either side of the globe).
		// Need the one facing the camera
		var MaxDistance = 10000;
		var bestPoint = vec3.create();
		for (var intersectionCounter = 0; intersectionCounter < intersectionPoints.length; intersectionCounter++) {
			var currDistance = vec3.dist(intersectionPoints[intersectionCounter], direction);
			if (currDistance < MaxDistance) {
				MaxDistance = currDistance;
				bestPoint = intersectionPoints[intersectionCounter];
			}
		}

		// Now that we have the coordinates of where the user clicked, find the nearest gridbox
		var MaxDistance = 10000;
		var bestGridBox = -1;
		if (vec3.dist(bestPoint, vec3.create()) > 0) {
			for (var gridBoxCounter = 0; gridBoxCounter < GridBoxData.length; gridBoxCounter++) {
				var currDistance = vec3.dist(bestPoint, GridBoxData[gridBoxCounter].point);
				if (currDistance < MaxDistance) {
					MaxDistance = currDistance;
					bestGridBox = gridBoxCounter;
				}
			}
		}

		// If we found a gridbox (if we clicked off of the globe, we wouldn't have found one, update the selected gridbox
		if (bestGridBox > -1) {
			var gridBox_Id = GridBoxData[bestGridBox].gridBox;
			var lat = GridBoxData[bestGridBox].lat;
			var lon = GridBoxData[bestGridBox].lon;
			var value = GridBoxData[bestGridBox].anomaly;
			LayerSettings.CurrGridBoxId = gridBox_Id;
			LayerSettings.CurrGridBoxLat = lat;
			LayerSettings.CurrGridBoxLon = lon;
			//$( "#slider_year" ).slider(y) );
//				LoadTimeseriesData(LayerSettings);

			$("div#divGridLat").text(lat);
			$("div#divGridLon").text(lon);
			$("div#divGridValue").text(value);
			$("div#divGridLat2").text(lat);
			$("div#divGridLon2").text(lon);

			//window.alert("Nearest gridbox location is lat: " + lat + ", lon: " + lon + " for ID#: " + gridBox_Id);
			//document.getElementById("timeSeriesButton1").style.display = "block";
			document.getElementById("gridBoxSize").style.display = "block";
			//$("div#divGridValue").style.display = "block";
		} else {
			document.getElementById("gridBoxSize").style.display = "none";
		}
	}

	var uri = new URI(window.location.href);
	uri.removeSearch("rMatrix");
	uri.removeSearch("rMatrixX");
	uri.removeSearch("rMatrixY");
	uri.removeSearch("xMov");
	uri.removeSearch("yMov");
	uri.addSearch("rMatrix", earthRotationMatrix);
	uri.addSearch("rMatrixX", earthRotationMatrix_x);
	uri.addSearch("rMatrixY", earthRotationMatrix_y);
	uri.addSearch("xMov", xMovement);
	uri.addSearch("yMov", yMovement);
	window.history.replaceState("", "", uri.search());
}

var MouseDragging;
function handleMouseMove(event) {
	event.preventDefault();
	if (mouseDown) {
		if (event.clientX != lastMouseX && event.clientY != lastMouseY) {
			MouseDragging = true;
		}
	}
	if (!mouseDown) {
		MouseDragging = false;
		return;
	}

	var newX = null;
	var newY = null;

	if (event.type == "mousemove") {
		newX = event.clientX; // + event.touches[0].clientX;
		newY = event.clientY; // + event.touches[0].clientY;
	}
	else if (event.type == "touchmove") {
		event.preventDefault();
		var touch = event.touches[0] || event.changedTouches[0];
		newX = touch.pageX;
		newY = touch.pageY;
	}

	if (displaySettings.globeView == "3d" || displaySettings.globeView == "ortho") {


		// TODO: Need to come up a "real" formula for scaling the rotation speed upon different zoom levels.
		var scale = null;
		if (zoomLevel <= 0) {
			scale = 10;
		}
		else {
			scale = (zoomLevel - globeDistance ) / 10;
		}
		// Lon Rotation
		var deltaX = newX - lastMouseX;
		var newRotationMatrix_x = mat4.create();
		mat4.identity(newRotationMatrix_x);
		mat4.rotate(newRotationMatrix_x, newRotationMatrix_x, degToRad(deltaX / scale), [0, 1, 0]);
		mat4.multiply(earthRotationMatrix_x, newRotationMatrix_x, earthRotationMatrix_x);

		// Lat Rotation
		var deltaY = newY - lastMouseY;
		var newRotationMatrix_y = mat4.create();
		mat4.identity(newRotationMatrix_y);

		mat4.rotate(newRotationMatrix_y, newRotationMatrix_y, degToRad(deltaY / scale), [1, 0, 0]);
		mat4.multiply(earthRotationMatrix_y, newRotationMatrix_y, earthRotationMatrix_y);

		// Combine the two rotations (we must keep them seperate to make sure we don't "tilt" the axis
		mat4.multiply(earthRotationMatrix, earthRotationMatrix_y, earthRotationMatrix_x);
		lastMouseX = newX;
		lastMouseY = newY;
	} else {
		// TODO: Need to come up a "real" formula for scaling the rotation speed upon different zoom levels.
		var scale = null;
		if (zoomLevel <= 0) {
			scale = 10;
		}
		else {
			scale = (zoomLevel) / 2;
		}
		// Lon Rotation
		var deltaX = 1.0 * (newX - lastMouseX) / scale;
		var deltaY = -1.0 * (newY - lastMouseY) / scale;
		//var newRotationMatrix_x = mat4.create();

		xMovement = xMovement + deltaX;
		yMovement = yMovement + deltaY;

		//mat4.scalar.translate(earthRotationMatrix, [deltaX/scale, deltaY/scale, 0], earthRotationMatrix);
		//mat4.identity(newRotationMatrix_x);

		//mat4.multiply(earthRotationMatrix_x, newRotationMatrix_x, earthRotationMatrix_x);

		// Lat Rotation
		/*var deltaY = newY - lastMouseY;
		 var newRotationMatrix_y = mat4.create();
		 mat4.identity(newRotationMatrix_y);

		 mat4.rotate(newRotationMatrix_y, newRotationMatrix_y, degToRad(deltaY / scale), [1, 0, 0]);
		 mat4.multiply(earthRotationMatrix_y, newRotationMatrix_y, earthRotationMatrix_y);

		 // Combine the two rotations (we must keep them seperate to make sure we don't "tilt" the axis
		 mat4.multiply(earthRotationMatrix, earthRotationMatrix_y, earthRotationMatrix_x);*/
		lastMouseX = newX;
		lastMouseY = newY;
	}
}
