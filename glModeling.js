/**
 * Created by mrsharky on 2/15/16.
 */


var WorldVertex = {
    PositionBuffer: [],
    ColorBuffer: [],
    IndexBuffer: [],
    TextureCoordBuffer: [],
    NormalBuffer: [],
    TangentBuffer: [],
    BiTangentBuffer: []
};

var GridBoxData = [];
var SphereTriangles = [];

function createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight) {
    SphereTriangles.push(topLeft.point);
    SphereTriangles.push(bottomLeft.point);
    SphereTriangles.push(topRight.point);

    SphereTriangles.push(topRight.point);
    SphereTriangles.push(bottomLeft.point);
    SphereTriangles.push(bottomRight.point);
}

/***
 *
 */
function worldBuffers() {
    // Reset the values because they may have already been set.
    WorldVertex.PositionBuffer = [];
    WorldVertex.ColorBuffer = [];
    WorldVertex.IndexBuffer = [];
    SphereTriangles = [];

    // Get the unique Lats, Lons
    if (displaySettings.pacificCenter) {
        for (lonCounter = 0; lonCounter < RawData.Lon.length; lonCounter++) {
            if (RawData.Lon[lonCounter] < 0) {
                RawData.Lon[lonCounter] = RawData.Lon[lonCounter] + 360.0;
            }
        }
    } else {
        for (lonCounter = 0; lonCounter < RawData.Lon.length; lonCounter++) {
            if (RawData.Lon[lonCounter] > 180) {
                RawData.Lon[lonCounter] = RawData.Lon[lonCounter] - 360.0;
            }
        }
    }

    var lats = RawData.Lat.unique().sort(function(a,b) { return a -b; });
    var lons = RawData.Lon.unique().sort(function(a,b) { return a -b; });

    var maxLon = RawData.Lon.max();
    var minLon = RawData.Lon.min();

    // .replace(/\s/g, "")
    /*switch (LayerSettings.DataUnits) {
        case 'Kelvins':
        case 'degK':
            switch (LayerSettings.TemperatureType) {
                case 'C':
                    for (var i = 0; i < RawData.Value.length; i++) {
                        RawData.ValueFinal.push(KelvinToCelsius(RawData.Value[i]));
                    }
                    break;
                default :
                    RawData.ValueFinal = RawData.Value;
            }
            break;
        default :
            RawData.ValueFinal = RawData.Value;
    }*/

    if (LayerSettings.DataUnits == '' || LayerSettings.DataUnits == '') {

    }
    //LayerSettings.maxValue = RawData.ValueFinal.max();
    //LayerSettings.minValue = RawData.ValueFinal.min();


    // Create a 2 dimensional "map" that stores all the values
    var fullData = {};

    GridBoxData = [];

    // Must initialze the sub-objects
    for (var i = 0; i < lats.length; i++) {
        fullData[[i]] = {};
    }

    // Loop through the data to create the "map"

    for (var i = 0; i < RawData.Lat.length; i++) {
        var curLat = RawData.Lat[i];
        var curLon = RawData.Lon[i];
        var curValue = RawData.ValueFinal[i];
        var gridBox = RawData.GridBox_ID[i];

        var latIndex = lats.indexOf(curLat);
        var lonIndex = lons.indexOf(curLon);
        var color;
        var colorMap = GetColorMap(displaySettings.currColormapName);

        // Pick the color selected in the dropdown
        if (curValue == null || curValue == undefined) {
            color = [0.0, 0.0, 0.0, 0.0];
        } else {
            switch (displaySettings.functionForColorMap) {
                case "customColorMapWithMidpoint" :
                    color = customColorMapWithMidpoint(colorMap, parseFloat(LayerSettings.minValue), 0.0, parseFloat(LayerSettings.maxValue), curValue);
                    break;
                case "customColorMap" :
                    color = customColorMap(colorMap, parseFloat(LayerSettings.minValue), parseFloat(LayerSettings.maxValue), curValue);
                    break;
                default :
                    color = customColorMap(colorMaps.rainbowColormap, parseInt(LayerSettings.minValue), parseInt(LayerSettings.maxValue), curValue);
                    break;
            }
        }

        var currCoordinates = {
            coordinates: {
                x: curLon, y: curLat, z: 0.0},
            normals: {x: 0, y: 0, z: 1},
            tangents: {x: 1, y: 0, z: 0},
            biTangents: {x:0, y: 1, z: 0}
        };

        if (displaySettings.globeView == "3d" || displaySettings.globeView == "ortho") {
            currCoordinates = cartesianToSphere(curLon * (Math.PI / 180.0),
              curLat * (Math.PI / 180.0),
              EarthRadius);
        }

        // Coordinates
        var coordinates = vec3.create();
        coordinates[0] = currCoordinates.coordinates.x;
        coordinates[1] = currCoordinates.coordinates.y;
        coordinates[2] = currCoordinates.coordinates.z;

        // Normals
        var normal = vec3.create();
        normal[0] = currCoordinates.normals.x;
        normal[1] = currCoordinates.normals.y;
        normal[2] = currCoordinates.normals.z;

        // Tangents
        var tangent = vec3.create();
        tangent[0] = currCoordinates.tangents.x;
        tangent[1] = currCoordinates.tangents.y;
        tangent[2] = currCoordinates.tangents.z;

        // BiTangents
        var biTangent = vec3.create();
        biTangent[0] = currCoordinates.biTangents.x;
        biTangent[1] = currCoordinates.biTangents.y;
        biTangent[2] = currCoordinates.biTangents.z;

        var curData = {
            gridBox: gridBox,
            lat: curLat,
            lon: curLon,
            anomaly: curValue,
            color: color,
            index: null,
            x: currCoordinates.coordinates.x,
            y: currCoordinates.coordinates.y,
            z: currCoordinates.coordinates.z,
            u: (curLon + 180.0)/360,
            v: (curLat + 90.0)/180,
            point: coordinates,
            normal: normal,
            tangent: tangent,
            biTangent: biTangent
        };

        GridBoxData.push(curData);
        fullData[latIndex][lonIndex] = curData;
    }

    var triangleData = [];

    if (displaySettings.smoothGridBoxValues) {
        for (var lonCounter = 0; lonCounter < lons.length - 1; lonCounter++) {
            for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                var bottomLeft = fullData[latCounter][lonCounter];
                var bottomRight = fullData[latCounter][lonCounter + 1];
                var topLeft = fullData[latCounter + 1][lonCounter];
                var topRight = fullData[latCounter + 1][lonCounter + 1];

                /*if (topLeft.anomaly == null)
                {
                    topLeft.color[0] = 0.0; topLeft.color[1] = 0.0; topLeft.color[2] = 0.0;
                    topRight.color[0] = 0.0; topRight.color[1] = 0.0; topRight.color[2] = 0.0;
                    bottomLeft.color[0] = 0.0; bottomLeft.color[1] = 0.0; bottomLeft.color[2] = 0.0;
                    bottomRight.color[0] = 0.0; bottomRight.color[1] = 0.0; bottomRight.color[2] = 0.0;
                }*/

                var triangleLeft = [topLeft, bottomLeft, topRight];
                var triangleRight = [topRight, bottomLeft, bottomRight];

                triangleData.push(triangleLeft);
                triangleData.push(triangleRight);

                // Need to also build out the triangles as well:
                createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
            }
        }

        // Add back in the first section, to complete going around the sphere
        {
            var lonCounter = lons.length - 1;
            {
                for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                    var bottomLeft = $.extend(true, {}, fullData[latCounter][lonCounter]);
                    var bottomRight = $.extend(true, {}, fullData[latCounter][0]);
                    var topLeft = $.extend(true, {}, fullData[latCounter + 1][lonCounter]);
                    var topRight = $.extend(true, {}, fullData[latCounter + 1][0]);

                    // Force the textCoord to map correctly for the globe
                    bottomRight.u += 1.0;
                    topRight.u += 1.0;

                    var triangleLeft = [topLeft, bottomLeft, topRight];
                    var triangleRight = [topRight, bottomLeft, bottomRight];

                    triangleData.push(triangleLeft);
                    triangleData.push(triangleRight);

                    // Need to also build out the triangles as well:
                    createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
                }
            }
        }

        // fix the edges on the 2d plot
        if (displaySettings.globeView == "2d")
        {
            {
                var lonIndexMax = lons.indexOf(maxLon);
                var lonIndexMin = lons.indexOf(minLon);

                // first strip
                {
                    for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                        var bottomLeft = $.extend(true, {}, fullData[latCounter][lonIndexMax]);
                        var bottomRight = $.extend(true, {}, fullData[latCounter][lonIndexMin]);
                        var topLeft = $.extend(true, {}, fullData[latCounter + 1][lonIndexMax]);
                        var topRight = $.extend(true, {}, fullData[latCounter + 1][lonIndexMin]);

                        {
                            bottomLeft.lon = bottomLeft.x = bottomLeft.point[0] = displaySettings.pacificCenter ? 0.0 : -180.0;
                            topLeft.lon = topLeft.x = topLeft.point[0] = displaySettings.pacificCenter ? 0.0 : -180.0;

                            // Force the textCoord to map correctly for the globe
                            bottomLeft.u = displaySettings.pacificCenter ? 0.5 : 0.0;
                            topLeft.u = displaySettings.pacificCenter ? 0.5 : 0.0;

                            var triangleLeft = [topLeft, bottomLeft, topRight];
                            var triangleRight = [topRight, bottomLeft, bottomRight];

                            triangleData.push(triangleLeft);
                            triangleData.push(triangleRight);

                            // Need to also build out the triangles as well:
                            createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
                        }
                    }
                }

                // last strip
                {
                    for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                        var bottomLeft = $.extend(true, {}, fullData[latCounter][lonIndexMax]);
                        var bottomRight = $.extend(true, {}, fullData[latCounter][lonIndexMin]);
                        var topLeft = $.extend(true, {}, fullData[latCounter + 1][lonIndexMax]);
                        var topRight = $.extend(true, {}, fullData[latCounter + 1][lonIndexMin]);

                        {
                            bottomRight.lon = bottomRight.x = bottomRight.point[0] = displaySettings.pacificCenter ? 360.0 : 180.0;
                            topRight.lon = topRight.x = topRight.point[0] = displaySettings.pacificCenter ? 360.0 : 180.0;

                            // Force the textCoord to map correctly for the globe
                            bottomRight.u = displaySettings.pacificCenter ? 1.5 : 1.0;
                            topRight.u = displaySettings.pacificCenter ? 1.5 : 1.0;

                            var triangleLeft = [topLeft, bottomLeft, topRight];
                            var triangleRight = [topRight, bottomLeft, bottomRight];

                            triangleData.push(triangleLeft);
                            triangleData.push(triangleRight);

                            // Need to also build out the triangles as well:
                            createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
                        }
                    }
                }
            }
        }
    } else {
        for (var lonCounter = 0; lonCounter < lons.length - 1; lonCounter++) {
            for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                var bottomLeft = jQuery.extend(true, {}, fullData[latCounter][lonCounter]);
                var bottomRight = jQuery.extend(true, {}, fullData[latCounter][lonCounter + 1]);
                var topLeft = jQuery.extend(true, {}, fullData[latCounter + 1][lonCounter]);
                var topRight = jQuery.extend(true, {}, fullData[latCounter + 1][lonCounter + 1]);

                bottomLeft.color[0] = topLeft.color[0];
                bottomLeft.color[1] = topLeft.color[1];
                bottomLeft.color[2] = topLeft.color[2];

                bottomRight.color[0] = topLeft.color[0];
                bottomRight.color[1] = topLeft.color[1];
                bottomRight.color[2] = topLeft.color[2];

                topRight.color[0] = topLeft.color[0];
                topRight.color[1] = topLeft.color[1];
                topRight.color[2] = topLeft.color[2];

                var triangleLeft = [topLeft, bottomLeft, topRight];
                var triangleRight = [topRight, bottomLeft, bottomRight];

                triangleData.push(triangleLeft);
                triangleData.push(triangleRight);

                // Need to also build out the triangles as well:
                createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
            }
        }

        // Add back in the first section, to complete going around the sphere
        {
            var lonCounter = lons.length - 1;
            for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                var bottomLeft = jQuery.extend(true, {}, fullData[latCounter][lonCounter]);
                var bottomRight = jQuery.extend(true, {}, fullData[latCounter][0]);
                var topLeft = jQuery.extend(true, {}, fullData[latCounter + 1][lonCounter]);
                var topRight = jQuery.extend(true, {}, fullData[latCounter + 1][0]);

                // Force the textCoord to map correctly for the globe
                bottomRight.u += 1.0;
                topRight.u += 1.0;

                bottomLeft.color[0] = topLeft.color[0];
                bottomLeft.color[1] = topLeft.color[1];
                bottomLeft.color[2] = topLeft.color[2];

                bottomRight.color[0] = topLeft.color[0];
                bottomRight.color[1] = topLeft.color[1];
                bottomRight.color[2] = topLeft.color[2];

                topRight.color[0] = topLeft.color[0];
                topRight.color[1] = topLeft.color[1];
                topRight.color[2] = topLeft.color[2];

                var triangleLeft = [topLeft, bottomLeft, topRight];
                var triangleRight = [topRight, bottomLeft, bottomRight];

                triangleData.push(triangleLeft);
                triangleData.push(triangleRight);

                // Need to also build out the triangles as well:
                createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
            }
        }

        // fix the edges on the 2d plot
        if (displaySettings.globeView == "2d") {
            var lonIndexMax = lons.indexOf(maxLon);
            var lonIndexMin = lons.indexOf(minLon);

            // first strip
            {
                for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                    var bottomLeft = $.extend(true, {}, fullData[latCounter][lonIndexMax]);
                    var bottomRight = $.extend(true, {}, fullData[latCounter][lonIndexMin]);
                    var topLeft = $.extend(true, {}, fullData[latCounter + 1][lonIndexMax]);
                    var topRight = $.extend(true, {}, fullData[latCounter + 1][lonIndexMin]);

                    {
                        bottomLeft.lon = bottomLeft.x = bottomLeft.point[0] = displaySettings.pacificCenter ? 0.0 : -180.0;
                        topLeft.lon = topLeft.x = topLeft.point[0] = displaySettings.pacificCenter ? 0.0 : -180.0;

                        // Force the textCoord to map correctly for the globe
                        bottomLeft.u = displaySettings.pacificCenter ? 0.5 : 0.0;
                        topLeft.u = displaySettings.pacificCenter ? 0.5 : 0.0;

                        bottomLeft.color[0] = topLeft.color[0];
                        bottomLeft.color[1] = topLeft.color[1];
                        bottomLeft.color[2] = topLeft.color[2];

                        bottomRight.color[0] = topLeft.color[0];
                        bottomRight.color[1] = topLeft.color[1];
                        bottomRight.color[2] = topLeft.color[2];

                        topRight.color[0] = topLeft.color[0];
                        topRight.color[1] = topLeft.color[1];
                        topRight.color[2] = topLeft.color[2];

                        var triangleLeft = [topLeft, bottomLeft, topRight];
                        var triangleRight = [topRight, bottomLeft, bottomRight];

                        triangleData.push(triangleLeft);
                        triangleData.push(triangleRight);

                        // Need to also build out the triangles as well:
                        createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
                    }
                }
            }

            // last strip
            {
                for (var latCounter = 0; latCounter < lats.length - 1; latCounter++) {
                    var bottomLeft = $.extend(true, {}, fullData[latCounter][lonIndexMax]);
                    var bottomRight = $.extend(true, {}, fullData[latCounter][lonIndexMin]);
                    var topLeft = $.extend(true, {}, fullData[latCounter + 1][lonIndexMax]);
                    var topRight = $.extend(true, {}, fullData[latCounter + 1][lonIndexMin]);

                    {
                        bottomRight.lon = bottomRight.x = bottomRight.point[0] = displaySettings.pacificCenter ? 360.0 : 180.0;
                        topRight.lon = topRight.x = topRight.point[0] = displaySettings.pacificCenter ? 360.0 : 180.0;

                        // Force the textCoord to map correctly for the globe
                        bottomRight.u = displaySettings.pacificCenter ? 1.5 : 1.0;
                        topRight.u = displaySettings.pacificCenter ? 1.5 : 1.0;

                        bottomLeft.color[0] = topLeft.color[0];
                        bottomLeft.color[1] = topLeft.color[1];
                        bottomLeft.color[2] = topLeft.color[2];

                        bottomRight.color[0] = topLeft.color[0];
                        bottomRight.color[1] = topLeft.color[1];
                        bottomRight.color[2] = topLeft.color[2];

                        topRight.color[0] = topLeft.color[0];
                        topRight.color[1] = topLeft.color[1];
                        topRight.color[2] = topLeft.color[2];

                        var triangleLeft = [topLeft, bottomLeft, topRight];
                        var triangleRight = [topRight, bottomLeft, bottomRight];

                        triangleData.push(triangleLeft);
                        triangleData.push(triangleRight);

                        // Need to also build out the triangles as well:
                        createSphereTriangles(bottomLeft, bottomRight, topLeft, topRight);
                    }
                }
            }
        }
    }
    var worldData = submitDataForTriangles(triangleData);
    WorldVertex.PositionBuffer = worldData.position;
    WorldVertex.ColorBuffer = worldData.color;
    WorldVertex.IndexBuffer = worldData.index;
    WorldVertex.TextureCoordBuffer = worldData.textureCoord;
    WorldVertex.NormalBuffer = worldData.normal;
    WorldVertex.TangentBuffer = worldData.tangent;
    WorldVertex.BiTangentBuffer = worldData.biTangent;
}

function submitDataForTriangles(triangleData)
{
    var counter = 0;
    var worldVertexPositionBuffer = [];
    var worldVertexColorBuffer = [];
    var worldVertexIndexBuffer = [];
    var worldVertexNormalBuffer = [];
    var worldVertexTangentBuffer = [];
    var worldVertexBiTangentBuffer = [];
    var worldVertexTextureCoordBuffer = [];
    var worldVertexPositionData = [];
    var worldVertexColorData = [];
    var worldVertexNormalData = [];
    var worldVertexTangentData = [];
    var worldVertexBiTangentData = [];
    var worldIndexData = [];
    var worldVertexTextureCoordData = [];
    for (var triangleCounter = 0; triangleCounter < triangleData.length; triangleCounter++)
    {
        var currTriangle = triangleData[triangleCounter];

        // Globe Position
        worldVertexPositionData.push(currTriangle[0].x);
        worldVertexPositionData.push(currTriangle[0].y);
        worldVertexPositionData.push(currTriangle[0].z);

        worldVertexPositionData.push(currTriangle[1].x);
        worldVertexPositionData.push(currTriangle[1].y);
        worldVertexPositionData.push(currTriangle[1].z);

        worldVertexPositionData.push(currTriangle[2].x);
        worldVertexPositionData.push(currTriangle[2].y);
        worldVertexPositionData.push(currTriangle[2].z);

        // Normals
        worldVertexNormalData.push(currTriangle[0].normal[0]);
        worldVertexNormalData.push(currTriangle[0].normal[1]);
        worldVertexNormalData.push(currTriangle[0].normal[2]);

        worldVertexNormalData.push(currTriangle[1].normal[0]);
        worldVertexNormalData.push(currTriangle[1].normal[1]);
        worldVertexNormalData.push(currTriangle[1].normal[2]);

        worldVertexNormalData.push(currTriangle[2].normal[0]);
        worldVertexNormalData.push(currTriangle[2].normal[1]);
        worldVertexNormalData.push(currTriangle[2].normal[2]);

        // Tangents
        worldVertexTangentData.push(currTriangle[0].tangent[0]);
        worldVertexTangentData.push(currTriangle[0].tangent[1]);
        worldVertexTangentData.push(currTriangle[0].tangent[2]);

        worldVertexTangentData.push(currTriangle[1].tangent[0]);
        worldVertexTangentData.push(currTriangle[1].tangent[1]);
        worldVertexTangentData.push(currTriangle[1].tangent[2]);

        worldVertexTangentData.push(currTriangle[2].tangent[0]);
        worldVertexTangentData.push(currTriangle[2].tangent[1]);
        worldVertexTangentData.push(currTriangle[2].tangent[2]);

        // BiTangents
        worldVertexBiTangentData.push(currTriangle[0].biTangent[0]);
        worldVertexBiTangentData.push(currTriangle[0].biTangent[1]);
        worldVertexBiTangentData.push(currTriangle[0].biTangent[2]);

        worldVertexBiTangentData.push(currTriangle[1].biTangent[0]);
        worldVertexBiTangentData.push(currTriangle[1].biTangent[1]);
        worldVertexBiTangentData.push(currTriangle[1].biTangent[2]);

        worldVertexBiTangentData.push(currTriangle[2].biTangent[0]);
        worldVertexBiTangentData.push(currTriangle[2].biTangent[1]);
        worldVertexBiTangentData.push(currTriangle[2].biTangent[2]);

        // Texture Coordinate
        worldVertexTextureCoordData.push(currTriangle[0].u);
        worldVertexTextureCoordData.push(currTriangle[0].v);

        worldVertexTextureCoordData.push(currTriangle[1].u);
        worldVertexTextureCoordData.push(currTriangle[1].v);

        worldVertexTextureCoordData.push(currTriangle[2].u);
        worldVertexTextureCoordData.push(currTriangle[2].v);

        // triangle Color
        worldVertexColorData.push(currTriangle[0].color[0]);	// Red
        worldVertexColorData.push(currTriangle[0].color[1]);	// Green
        worldVertexColorData.push(currTriangle[0].color[2]);	// Blue
        worldVertexColorData.push(1.0);                       // Opac

        worldVertexColorData.push(currTriangle[1].color[0]);
        worldVertexColorData.push(currTriangle[1].color[1]);
        worldVertexColorData.push(currTriangle[1].color[2]);
        worldVertexColorData.push(1.0);

        worldVertexColorData.push(currTriangle[2].color[0]);
        worldVertexColorData.push(currTriangle[2].color[1]);
        worldVertexColorData.push(currTriangle[2].color[2]);
        worldVertexColorData.push(1.0);

        worldIndexData.push(counter++);
        worldIndexData.push(counter++);
        worldIndexData.push(counter++);

        if ((counter*2) / (Math.pow(2,16)-1) > 1.0 || triangleCounter == triangleData.length -1)
        {
            // Position
            var currWorldVertexPositionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currWorldVertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(worldVertexPositionData), gl.STATIC_DRAW);
            currWorldVertexPositionBuffer.itemSize = 3;
            currWorldVertexPositionBuffer.numItems = worldVertexPositionData.length / 3;
            worldVertexPositionBuffer.push(currWorldVertexPositionBuffer);

            // Texture Coordinate
            var currWorldVertexTextureCoordData = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currWorldVertexTextureCoordData);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(worldVertexTextureCoordData), gl.STATIC_DRAW);
            currWorldVertexTextureCoordData.itemSize = 2;
            currWorldVertexTextureCoordData.numItems = worldVertexTextureCoordData.length / 2;
            worldVertexTextureCoordBuffer.push(currWorldVertexTextureCoordData);

            // Color
            var currWorldVertexColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currWorldVertexColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(worldVertexColorData), gl.STATIC_DRAW);
            currWorldVertexColorBuffer.itemSize = 4;
            currWorldVertexColorBuffer.numItems = worldVertexColorData.length / 4;
            worldVertexColorBuffer.push(currWorldVertexColorBuffer);

            // Normal
            var currWorldVertexNormalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currWorldVertexNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(worldVertexNormalData), gl.STATIC_DRAW);
            currWorldVertexNormalBuffer.itemSize = 3;
            currWorldVertexNormalBuffer.numItems = worldVertexNormalData.length / 3;
            worldVertexNormalBuffer.push(currWorldVertexNormalBuffer);

            // Tangent
            var currWorldVertexTangentBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currWorldVertexTangentBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(worldVertexTangentData), gl.STATIC_DRAW);
            currWorldVertexTangentBuffer.itemSize = 3;
            currWorldVertexTangentBuffer.numItems = worldVertexTangentData.length / 3;
            worldVertexTangentBuffer.push(currWorldVertexTangentBuffer);

            // BiTangent
            var currWorldVertexBiTangentBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currWorldVertexBiTangentBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(worldVertexBiTangentData), gl.STATIC_DRAW);
            currWorldVertexBiTangentBuffer.itemSize = 3;
            currWorldVertexBiTangentBuffer.numItems = worldVertexBiTangentData.length / 3;
            worldVertexBiTangentBuffer.push(currWorldVertexBiTangentBuffer);

            // Index
            var currWorldVertexIndexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, currWorldVertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(worldIndexData), gl.STATIC_DRAW);
            currWorldVertexIndexBuffer.itemSize = 1;
            currWorldVertexIndexBuffer.numItems = worldIndexData.length;
            worldVertexIndexBuffer.push(currWorldVertexIndexBuffer);

            // Reset
            worldVertexPositionData = [];
            worldVertexColorData = [];
            worldIndexData = [];
            worldVertexTextureCoordData = [];
            worldVertexNormalData = [];
            worldVertexTangentData = [];
            worldVertexBiTangentData = [];
            counter = 0;
            //i++;
        }
    }
    return {
        position: worldVertexPositionBuffer,
        index: worldVertexIndexBuffer,
        color: worldVertexColorBuffer,
        textureCoord: worldVertexTextureCoordBuffer,
        normal: worldVertexNormalBuffer,
        tangent: worldVertexTangentBuffer,
        biTangent: worldVertexBiTangentBuffer
    };
}

function CreateLatLonGridLines(lonDegreeStep, latDegreeStep) {
    var latLinesData = {Lat: [], Lon: []};
    var visualStep = 1.0;

    // Vertical Lines
    var latStart = -90;
    var latEnd = 90;
    var lonStart = -180;
    var lonEnd = 180;
    latLinesData.Lat.push(null);
    latLinesData.Lon.push(null);
    // Vertical Lines
    for (var lonCounter = 0; lonCounter <= (lonEnd-lonStart)/lonDegreeStep; lonCounter++)
    {
        var curLon = lonStart + lonCounter * lonDegreeStep;
        for (var latCounter = 0; latCounter <= (latEnd-latStart)/visualStep; latCounter++)
        {
            var curLat = latStart + latCounter * visualStep;

            latLinesData.Lat.push(curLat);
            latLinesData.Lon.push(curLon);
        }
        latLinesData.Lat.push(null);
        latLinesData.Lon.push(null);
    }
    // Horizontal Lines
    for (var latCounter = 0; latCounter <= (latEnd-latStart)/latDegreeStep; latCounter++)
    {
        var curLat = latStart + latCounter * latDegreeStep;
        for (var lonCounter = 0; lonCounter <= (lonEnd-lonStart)/visualStep; lonCounter++)
        {
            var curLon = lonStart + lonCounter * visualStep;

            latLinesData.Lat.push(curLat);
            latLinesData.Lon.push(curLon);
        }
        latLinesData.Lat.push(null);
        latLinesData.Lon.push(null);
    }
    return latLinesData;
}

var LineVertex = {
    PositionBuffer: [],
    ColorBuffer: [],
    NormalBuffer: [],
    IndexBuffer: [],
    TangentBuffer: [],
    BiTangentBuffer: [],
    TextureCoordBuffer: []
};

function lineBuffers()
{
    LineVertex = {
        PositionBuffer: [],
        ColorBuffer: [],
        NormalBuffer: [],
        IndexBuffer: [],
        TangentBuffer: [],
        BiTangentBuffer: [],
        TextureCoordBuffer: []
    };

    if (displaySettings.coasts && Coasts.Lat.length > 0) {
        generateLineVertex(Coasts, [0.35, 0.35, 0.35, 1.0]);
    }

    if (displaySettings.minorIslands && Coasts_MinorIslands.Lat.length > 0) {
        generateLineVertex(Coasts_MinorIslands, [0.35, 0.35, 0.35, 1.0]);
    }

    if (displaySettings.lakes && Lakes.Lat.length > 0) {
        generateLineVertex(Lakes, [0.45, 0.45, 0.45, 1.0]);
    }

    if (displaySettings.rivers && Rivers.Lat.length > 0) {
        generateLineVertex(Rivers, [0.45, 0.45, 0.45, 1.0]);
    }

    if (displaySettings.latLons) {
        var latLonData = CreateLatLonGridLines(10, 10);
        generateLineVertex(latLonData, [0.4, 0.4, 0.4, 1.0]);
    }

    if (displaySettings.geoLines) {
        generateLineVertex(GeoLines, [0.45, 0.45, 0.45, 1.0]);
    }

    if (displaySettings.timeZones) {
        generateLineVertex(TimeZones, [0.45, 0.45, 0.45, 1.0]);
    }
}

function generateLineVertex(rawData, color) {
    var proccessedData = submitDataForLines(rawData, color);
    LineVertex.PositionBuffer = LineVertex.PositionBuffer.concat(proccessedData.position);
    LineVertex.ColorBuffer = LineVertex.ColorBuffer.concat(proccessedData.color);
    LineVertex.IndexBuffer = LineVertex.IndexBuffer.concat(proccessedData.index);
    LineVertex.NormalBuffer = LineVertex.NormalBuffer.concat(proccessedData.normal);
    LineVertex.TangentBuffer = LineVertex.TangentBuffer.concat(proccessedData.tangent);
    LineVertex.BiTangentBuffer = LineVertex.BiTangentBuffer.concat(proccessedData.biTangent);
    LineVertex.TextureCoordBuffer = LineVertex.TextureCoordBuffer.concat(proccessedData.texture);
}


function submitDataForLines(SubData, color) {
    dataLon = SubData.Lon;
    dataLat = SubData.Lat;
    // Zero out final buffers
    var PositionBuffer = [];
    var ColorBuffer = [];
    var NormalBuffer = [];
    var TangentBuffer = [];
    var BiTangentBuffer = [];
    var TextureBuffer = [];
    var IndexBuffer = [];

    var linePositionData = [];
    var lineColorData = [];
    var lineNormalData = [];
    var lineTangentData = [];
    var lineBiTangentData = [];
    var lineTextureData = [];
    var lineIndexData = [];

    var prevLon;

    var currLineIndexData = [];
    var counter = 0;
    for (var i = 0; i < dataLat.length; i++) {
        // if our current entry is null, it means it's the start of a new array
        if (dataLat[i] == null ) {
            // if we're not on the first entry, and we've hit a null, then we need the put the last "coast" into buffer
            if (i != 0) {
                for (var j = 1; j < currLineIndexData.length; j++)
                {
                    lineIndexData.push(currLineIndexData[j-1]);
                    lineIndexData.push(currLineIndexData[j]);
                }
            }

            // Index
            currLineIndexData = [];
            i++;
        }

        // if we hit the 16 bit ceiling for indexes (or the last element
        if ( (i != 0 && counter / (Math.pow(2,16)-2000) > 1.0) || i == dataLat.length -2 )
        {
            counter = 0;
            for (var j = 1; j < currLineIndexData.length; j++)
            {
                lineIndexData.push(currLineIndexData[j-1]);
                lineIndexData.push(currLineIndexData[j]);
            }

            // Position
            var currLineVertexPositionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currLineVertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linePositionData), gl.STATIC_DRAW);
            currLineVertexPositionBuffer.itemSize = 3;
            currLineVertexPositionBuffer.numItems = linePositionData.length / 3;
            PositionBuffer.push(currLineVertexPositionBuffer);

            // Color
            var currLineVertexColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currLineVertexColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineColorData), gl.STATIC_DRAW);
            currLineVertexColorBuffer.itemSize = 4;
            currLineVertexColorBuffer.numItems = lineColorData.length / 4;
            ColorBuffer.push(currLineVertexColorBuffer);

            // Normal
            var currLineVertexNormalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currLineVertexNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineNormalData), gl.STATIC_DRAW);
            currLineVertexNormalBuffer.itemSize = 3;
            currLineVertexNormalBuffer.numItems = lineNormalData.length / 3;
            NormalBuffer.push(currLineVertexNormalBuffer);

            // Tangent
            var currLineVertexTangentBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currLineVertexTangentBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineTangentData), gl.STATIC_DRAW);
            currLineVertexTangentBuffer.itemSize = 3;
            currLineVertexTangentBuffer.numItems = lineTangentData.length / 3;
            TangentBuffer.push(currLineVertexTangentBuffer);

            // BiTangent
            var currLineVertexBiTangentBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currLineVertexBiTangentBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineBiTangentData), gl.STATIC_DRAW);
            currLineVertexBiTangentBuffer.itemSize = 3;
            currLineVertexBiTangentBuffer.numItems = lineBiTangentData.length / 3;
            BiTangentBuffer.push(currLineVertexBiTangentBuffer);

            // Texture
            var currLineVertexTextureBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, currLineVertexTextureBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineTextureData), gl.STATIC_DRAW);
            currLineVertexTextureBuffer.itemSize = 2;
            currLineVertexTextureBuffer.numItems = lineTextureData.length / 2;
            TextureBuffer.push(currLineVertexTextureBuffer);

            // Index
            var currLineVertexIndexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, currLineVertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(lineIndexData), gl.STATIC_DRAW);
            currLineVertexIndexBuffer.itemSize = 1;
            currLineVertexIndexBuffer.numItems = lineIndexData.length;
            IndexBuffer.push(currLineVertexIndexBuffer);

            // Index
            currLineIndexData = [];
            linePositionData = [];
            lineColorData = [];
            lineNormalData = [];
            lineTangentData = [];
            lineBiTangentData = [];
            lineTextureData = [];
            lineIndexData = [];
            //i++;
        }

        var curLon = dataLon[i];
        var curLat = dataLat[i];

        // if we've gone over the bounds of the map (2D) we need to add new end pieces and indexes
        if (displaySettings.globeView == "2d")
        {
            var lonMax = displaySettings.pacificCenter ? 360.0 : 180;
            var lonMin = displaySettings.pacificCenter ? 0.0 : -180;

            if (displaySettings.pacificCenter) {
                if (curLon < 0) {
                    curLon = curLon + 360.0;
                }
            }

            var currCoordinates = {
                coordinates: {x: curLon, y: curLat, z: 0.25},
                normals: {x: 0, y: 0, z: 1},
                u: (curLon + 180.0)/360,
                v: (curLat + 90.0)/180,
                tangents: {x: 1, y: 0, z: 0},
                biTangents: {x: 0, y: 1, z: 0}};

            var passBounds = false;
            if (i == 0) {
                prevLon = curLon;
            }

            if (Math.abs(curLon - prevLon) > 300 && currLineIndexData.length > 0) {
                if (prevLon < curLon) {
                    currCoordinates.coordinates.x = lonMin;
                } else if (prevLon > curLon) {
                    currCoordinates.coordinates.x = lonMax;
                }
                passBounds = true;
            }

            if (passBounds) {
                // Spherical World Positions
                linePositionData.push(currCoordinates.coordinates.x);			// X
                linePositionData.push(currCoordinates.coordinates.y);			// Y
                linePositionData.push(currCoordinates.coordinates.z);			// Z

                // Normal
                lineNormalData.push(currCoordinates.normals.x);
                lineNormalData.push(currCoordinates.normals.y);
                lineNormalData.push(currCoordinates.normals.z);

                // Tangent
                lineTangentData.push(currCoordinates.tangents.x);
                lineTangentData.push(currCoordinates.tangents.y);
                lineTangentData.push(currCoordinates.tangents.z);

                // BiTangent
                lineBiTangentData.push(currCoordinates.biTangents.x);
                lineBiTangentData.push(currCoordinates.biTangents.y);
                lineBiTangentData.push(currCoordinates.biTangents.z);

                // Texture
                lineTextureData.push(currCoordinates.u);
                lineTextureData.push(currCoordinates.v);

                // Color
                lineColorData.push(color[0]);					// R
                lineColorData.push(color[1]);					// G
                lineColorData.push(color[2]);					// B
                lineColorData.push(color[3]);					// O

                currLineIndexData.push(counter);

                for (var j = 1; j < currLineIndexData.length; j++) {
                    lineIndexData.push(currLineIndexData[j-1]);
                    lineIndexData.push(currLineIndexData[j]);
                }

                // Index
                currLineIndexData = [];
                prevLon = curLon;
                counter++;
            }
        }

        var currCoordinates = {
            coordinates: {x: curLon, y: curLat, z: 0.25},
            normals: {x: 0, y: 0, z: 1},
            u: (curLon + 180.0)/360,
            v: (curLat + 90.0)/180,
            tangents: {x: 1, y: 0, z: 0},
            biTangents: {x: 0, y: 1, z: 0}};
        if (displaySettings.globeView == "3d" || displaySettings.globeView == "ortho") {
            currCoordinates = cartesianToSphere(curLon * (Math.PI / 180.0),
              curLat * (Math.PI / 180.0),
              EarthRadius + 0.01);
        }

        // Spherical World Positions
        linePositionData.push(currCoordinates.coordinates.x);			// X
        linePositionData.push(currCoordinates.coordinates.y);			// Y
        linePositionData.push(currCoordinates.coordinates.z);			// Z

        // Normal
        lineNormalData.push(currCoordinates.normals.x);
        lineNormalData.push(currCoordinates.normals.y);
        lineNormalData.push(currCoordinates.normals.z);

        // Tangent
        lineTangentData.push(currCoordinates.tangents.x);
        lineTangentData.push(currCoordinates.tangents.y);
        lineTangentData.push(currCoordinates.tangents.z);

        // BiTangent
        lineBiTangentData.push(currCoordinates.biTangents.x);
        lineBiTangentData.push(currCoordinates.biTangents.y);
        lineBiTangentData.push(currCoordinates.biTangents.z);

        // Texture
        lineTextureData.push(currCoordinates.u);
        lineTextureData.push(currCoordinates.v);

        // Color
        lineColorData.push(color[0]);					// R
        lineColorData.push(color[1]);					// G
        lineColorData.push(color[2]);					// B
        lineColorData.push(color[3]);					// O

        currLineIndexData.push(counter);
        prevLon = curLon;
        counter++;
    }

    return {
        position: PositionBuffer,
        index: IndexBuffer,
        color: ColorBuffer,
        normal: NormalBuffer,
        tangent: TangentBuffer,
        biTangent: BiTangentBuffer,
        texture: TextureBuffer
    };
}

var latLinesVertexPositionBuffer = [];
var latLinesVertexColorBuffer = [];
var lonLinesVertexPositionBuffer = [];
var lonLinesVertexColorBuffer = [];

var currDegreeStep = 10;
function latLonBuffers() {
    latLinesVertexPositionBuffer = [];
    latLinesVertexColorBuffer = [];
    lonLinesVertexPositionBuffer = [];
    lonLinesVertexColorBuffer = [];

    var degreeStep = currDegreeStep;
    var visualStep = 2.5;
    // Lat lines
    for (var latCounter = 0; latCounter < 180/degreeStep; latCounter++)
    {
        curLat = latCounter * degreeStep - 90.0;
        var currLatLinesVertexPositionData = [];
        var currLatLinesVertexColorData = [];
        for (lonCounter = 0; lonCounter <= 360/visualStep; lonCounter++)
        {
            curLon = (lonCounter * visualStep) - (displaySettings.pacificCenter == true ? 0: 180);
            var currCoordinates = {x: curLon, y: curLat, z: 2.0};
            if (displaySettings.globeView == "3d" || displaySettings.globeView == "ortho") {
                var currCoordinates = cartesianToSphere(curLon * (Math.PI / 180.0),
                  curLat * (Math.PI / 180.0),
                  EarthRadius + 0.05);
            }

            // Spherical World Positions
            currLatLinesVertexPositionData.push(currCoordinates.x);			// X
            currLatLinesVertexPositionData.push(currCoordinates.y);			// Y
            currLatLinesVertexPositionData.push(currCoordinates.z);			// Z

            // Color
            currLatLinesVertexColorData.push(0.4);					// R
            currLatLinesVertexColorData.push(0.4);					// G
            currLatLinesVertexColorData.push(0.4);					// B
            currLatLinesVertexColorData.push(1.0);					// O
        }

        // Position
        var currLatLinesVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, currLatLinesVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currLatLinesVertexPositionData), gl.STATIC_DRAW);
        currLatLinesVertexPositionBuffer.itemSize = 3;
        currLatLinesVertexPositionBuffer.numItems = currLatLinesVertexPositionData.length/3;
        latLinesVertexPositionBuffer.push(currLatLinesVertexPositionBuffer);

        // Color
        var currLatLinesVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, currLatLinesVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currLatLinesVertexColorData), gl.STATIC_DRAW);
        currLatLinesVertexColorBuffer.itemSize = 4;
        currLatLinesVertexColorBuffer.numItems = currLatLinesVertexColorData.length/4;
        latLinesVertexColorBuffer.push(currLatLinesVertexColorBuffer);
    }

    for (var lonCounter = 0; lonCounter < 360/degreeStep; lonCounter++)
    {
        curLon = lonCounter * degreeStep;
        var currLonLinesVertexPositionData = [];
        var currLonLinesVertexColorData = [];
        for (latCounter = 0; latCounter <= 360/visualStep; latCounter++)
        {
            curLat = latCounter * visualStep;

            var currCoordinates = {x: curLon-180, y: curLat-90, z: 2.0};
            if (displaySettings.globeView == "3d" || displaySettings.globeView == "ortho") {
                var currCoordinates = cartesianToSphere(curLon * (Math.PI / 180.0),
                  curLat * (Math.PI / 180.0),
                  EarthRadius + 0.05);
            }

            // Spherical World Positions
            currLonLinesVertexPositionData.push(currCoordinates.x);			// X
            currLonLinesVertexPositionData.push(currCoordinates.y);			// Y
            currLonLinesVertexPositionData.push(currCoordinates.z);			// Z

            // Color
            currLonLinesVertexColorData.push(0.4);					// R
            currLonLinesVertexColorData.push(0.4);					// G
            currLonLinesVertexColorData.push(0.4);					// B
            currLonLinesVertexColorData.push(1.0);					// O
        }

        // Position
        var currLonLinesVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, currLonLinesVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currLonLinesVertexPositionData), gl.STATIC_DRAW);
        currLonLinesVertexPositionBuffer.itemSize = 3;
        currLonLinesVertexPositionBuffer.numItems = currLonLinesVertexPositionData.length/3;
        lonLinesVertexPositionBuffer.push(currLonLinesVertexPositionBuffer);

        // Color
        var currLonLinesVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, currLonLinesVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currLonLinesVertexColorData), gl.STATIC_DRAW);
        currLonLinesVertexColorBuffer.itemSize = 4;
        currLonLinesVertexColorBuffer.numItems = currLonLinesVertexColorData.length/4;
        lonLinesVertexColorBuffer.push(currLonLinesVertexColorBuffer);
    }
}

function SetAllGlBuffers(shader, vertex, glElementType) {
    gl.useProgram(shader);
    setMatrixLightingUniforms(shader);
    for (var i = 0; i < vertex.PositionBuffer.length; i++) {
        // Texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, globeBumpMap);
        gl.uniform1i(shader.samplerUniform, 0);

        // Position
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex.PositionBuffer[i]);
        gl.vertexAttribPointer(shader.vertexPositionAttribute, vertex.PositionBuffer[i].itemSize, gl.FLOAT, false, 0, 0);

        // Color
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex.ColorBuffer[i]);
        gl.vertexAttribPointer(shader.vertexColorAttribute, vertex.ColorBuffer[i].itemSize, gl.FLOAT, false, 0, 0);

        // Normal
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex.NormalBuffer[i]);
        gl.vertexAttribPointer(shader.vertexNormalAttribute, vertex.NormalBuffer[i].itemSize, gl.FLOAT, false, 0, 0);

        // Tangent
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex.TangentBuffer[i]);
        gl.vertexAttribPointer(shader.vertexTangentAttribute, vertex.TangentBuffer[i].itemSize, gl.FLOAT, false, 0, 0);

        // BiTangent
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex.BiTangentBuffer[i]);
        gl.vertexAttribPointer(shader.vertexBiTangentAttribute, vertex.BiTangentBuffer[i].itemSize, gl.FLOAT, false, 0, 0);

        // Texture Coord
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex.TextureCoordBuffer[i]);
        gl.vertexAttribPointer(shader.textureCoordAttribute, vertex.TextureCoordBuffer[i].itemSize, gl.FLOAT, false, 0, 0);

        // Index
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex.IndexBuffer[i]);
        setMatrixUniforms(shader);
        gl.drawElements(glElementType, vertex.IndexBuffer[i].numItems, gl.UNSIGNED_SHORT, 0);
    }
}
