/**
 * Created by mrsharky on 2/15/16.
 */


var gl;

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}


var shaderProgram;
var Shaders = {
    lineShader: null,
    worldShader: null
};

/***
 *
 */
function initShaders() {

    // World Shader
    {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        Shaders.worldShader = gl.createProgram();
        gl.attachShader(Shaders.worldShader, vertexShader);
        gl.attachShader(Shaders.worldShader, fragmentShader);
        gl.linkProgram(Shaders.worldShader);

        if (!gl.getProgramParameter(Shaders.worldShader, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(Shaders.worldShader);

        Shaders.worldShader.vertexPositionAttribute = gl.getAttribLocation(Shaders.worldShader, "aVertexPosition");
        gl.enableVertexAttribArray(Shaders.worldShader.vertexPositionAttribute);

        Shaders.worldShader.vertexNormalAttribute = gl.getAttribLocation(Shaders.worldShader, "aVertexNormal");
        gl.enableVertexAttribArray(Shaders.worldShader.vertexNormalAttribute);

        Shaders.worldShader.vertexTangentAttribute = gl.getAttribLocation(Shaders.worldShader, "aVertexTangent");
        gl.enableVertexAttribArray(Shaders.worldShader.vertexTangentAttribute);

        Shaders.worldShader.vertexBiTangentAttribute = gl.getAttribLocation(Shaders.worldShader, "aVertexBiTangent");
        gl.enableVertexAttribArray(Shaders.worldShader.vertexBiTangentAttribute);

        Shaders.worldShader.vertexColorAttribute = gl.getAttribLocation(Shaders.worldShader, "aVertexColor");
        gl.enableVertexAttribArray(Shaders.worldShader.vertexColorAttribute);

        Shaders.worldShader.textureCoordAttribute = gl.getAttribLocation(Shaders.worldShader, "aTextureCoord");
        gl.enableVertexAttribArray(Shaders.worldShader.textureCoordAttribute);

        Shaders.worldShader.pMatrixUniform = gl.getUniformLocation(Shaders.worldShader, "uPMatrix");
        Shaders.worldShader.mvMatrixUniform = gl.getUniformLocation(Shaders.worldShader, "uMVMatrix");
        Shaders.worldShader.samplerUniform = gl.getUniformLocation(Shaders.worldShader, "uSampler");
        Shaders.worldShader.useLightingUniform = gl.getUniformLocation(Shaders.worldShader, "uUseLighting");

        Shaders.worldShader.ambientColorUniform = gl.getUniformLocation(Shaders.worldShader, "uAmbientColor");
        Shaders.worldShader.lightDirectionUniform = gl.getUniformLocation(Shaders.worldShader, "uLightingDirection");
        Shaders.worldShader.directionalColorUniform = gl.getUniformLocation(Shaders.worldShader, "uDirectionalColor");

        Shaders.worldShader.nMatrixUniform = gl.getUniformLocation(Shaders.worldShader, "uNMatrix");
        Shaders.worldShader.vMatrixUniform = gl.getUniformLocation(Shaders.worldShader, "uVMatrix");

    }
}

function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

var globeBumpMap;
function initTextures(texture) {
    globeBumpMap = gl.createTexture();
    globeBumpMap.image = new Image();
    globeBumpMap.image.onload = function() {
        handleLoadedTexture(globeBumpMap)
    };
    globeBumpMap.image.src = texture;
}


function mvPushMatrix() {
    var copy = mat4.create();
    mat4.copy(copy, mvMatrix);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

function setMatrixUniforms(shader) {
    gl.uniformMatrix4fv(shader.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shader.mvMatrixUniform, false, mvMatrix);
    gl.uniformMatrix4fv(shader.vMatrixUniform, false, vMatrix);

    gl.uniform1i(shader.useLightingUniform, displaySettings.lightingEnabled);
    gl.uniform3fv(shader.ambientColorUniform, displaySettings.lightAmbient);
    gl.uniform3fv(shader.lightDirectionUniform, lightDirection);
    gl.uniform3fv(shader.directionalColorUniform, displaySettings.lightDirectionColor);
}

function setMatrixLightingUniforms(shader) {
    // Lighting related
    var normalMatrix = mat3.create();
    mat4.toMat3(normalMatrix, mvMatrix);
    mat3.invert(normalMatrix, normalMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    gl.uniformMatrix3fv(shader.nMatrixUniform, false, normalMatrix);
}

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    mat4.identity(mvMatrix);
    mvPushMatrix();
    var xMovementCenter = 0;
    if (displaySettings.pacificCenter && displaySettings.globeView == "2d") {
        xMovementCenter = -180;
    }
    var widthToHeight = gl.viewportWidth / gl.viewportHeight;

    if (displaySettings.globeView == "3d" || displaySettings.globeView == "2d") {
        mat4.perspective(pMatrix, 45, widthToHeight, 0.1, -1000);
        mat4.translate(mvMatrix, mvMatrix, [xMovement + xMovementCenter, yMovement, globeDistance + zoomLevel]);
    } else if (displaySettings.globeView == "ortho") {
        var orthoZoom = -1 * zoomLevel / (80.0 * 2.0);
        mat4.ortho(pMatrix, (-widthToHeight * 80) * orthoZoom, (widthToHeight * 80) * orthoZoom
          , (-1 * 80) * orthoZoom, (1 * 80) * orthoZoom, -1000, 1000.0);
        mat4.translate(mvMatrix, mvMatrix, [xMovement + xMovementCenter, yMovement, -1000.0]);
    }

    mat4.multiply(mvMatrix, mvMatrix, earthRotationMatrix);

    // lighting
    lightDirection = vec3.clone(displaySettings.lightDirection);

    //mat4.multiplyVec3(lightDirection, mvMatrix, lightDirection);

    //mat4.multiply(displaySettings.lightDirection, displaySettings.lightDirection, earthRotationMatrix);
    if (displaySettings.globeView == "3d" || displaySettings.globeView == "ortho") {
        mat4.rotate(mvMatrix, mvMatrix, degToRad(-90), [1, 0, 0]);

        //mat4.multiplyVec3(displaySettings.lightDirection, mvMatrix, displaySettings.lightDirection);

        //mat4.rotate(displaySettings.lightDirection, displaySettings.lightDirection, degToRad(-90), [1, 0, 0]);
    }

    // the globe
    mat4.copy(vMatrix, mvMatrix);
    mvPushMatrix();
    if (WorldVertex.PositionBuffer.length > 0) {
        SetAllGlBuffers(Shaders.worldShader, WorldVertex, gl.TRIANGLES);
    }
    mvPopMatrix();

    // Line Data
    mvPushMatrix();
    if (LineVertex.PositionBuffer.length > 0) {
        SetAllGlBuffers(Shaders.worldShader, LineVertex, gl.LINES);
    }
    mvPopMatrix();
}

function initBuffers() {

    // Create the lat/lon lines
    latLonBuffers();

    // Create the coastline Buffers
    lineBuffers();

    // Create the world (globe) buffers
    worldBuffers();

    // Draw the legend
    if (RawData.Lat.length > 0) {
        drawLegend();
    }

    // Draw Time series chart
    //GenerateTimeSeriesChart();
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}

function SetOptionsFromUrl(callback) {
// Get values from uri
    var uri = new URI(window.location.href);
    var parameters = uri.search(true);

    // Movement
    if (parameters.hasOwnProperty("rMatrix")) {
        var rMatrix = parameters.rMatrix.split(",");
        for (var i = 0; i < rMatrix.length; i++) {
            earthRotationMatrix[i] = parseFloat(rMatrix[i]);
        }
    }

    if (parameters.hasOwnProperty("rMatrixX")) {
        var rMatrixX = parameters.rMatrixX.split(",");
        for (var i = 0; i < rMatrix.length; i++) {
            earthRotationMatrix_x[i] = parseFloat(rMatrixX[i]);
        }
    }

    if (parameters.hasOwnProperty("rMatrixY")) {
        var rMatrixY = parameters.rMatrixY.split(",");
        for (var i = 0; i < rMatrix.length; i++) {
            earthRotationMatrix_y[i] = parseFloat(rMatrixY[i]);
        }
    }


    if (parameters.hasOwnProperty("xMov")) {
        xMovement = parseFloat(parameters.xMov);
    }

    if (parameters.hasOwnProperty("yMov")) {
        yMovement = parseFloat(parameters.yMov);
    }

    // Zoom
    if (parameters.hasOwnProperty("zoom")) {
        zoomLevel = parseFloat(parameters.zoom);
    }

    // Level_ID
    LayerSettings.Level_ID = 1;
    if (parameters.hasOwnProperty("level")) {
        LayerSettings.Level_ID = parseInt(parameters.level);
    }

    // Date
    if (parameters.hasOwnProperty("date")) {
        ChangeDate(parameters.date);
    }

    // database
    var database;
    if (parameters.hasOwnProperty("database")) {
        var currDatabase = GetDatasetById(parseInt(parameters.database));
        if (parameters.hasOwnProperty("date")) {
            database = ChangeDatasetDate(currDatabase, LayerSettings.CurrDate, LayerSettings.Level_ID);
        } else {
            database = ChangeDataset(currDatabase, LayerSettings.Level_ID);
        }
    }

    // Colormap
    if (parameters.hasOwnProperty("colorMap")) {
        var currColorMap = ColorMaps[parseInt(parameters.colorMap)];
        displaySettings.functionForColorMap = currColorMap.Function;
        displaySettings.currColormapName = currColorMap.FullName;
    }

    var bumpMapping;
    if (parameters.hasOwnProperty("bumpMapping")) {
        bumpMapping = changeBumpMapping(parameters.bumpMapping);
    }

    var geoLines;
    if (parameters.hasOwnProperty("geoLines")) {
        geoLines = ChangeMenuOption(parameters.geoLines, MenuOptions.GeoLines, false, null);
    }

    var globe;
    if (parameters.hasOwnProperty("globe")) {
        globe = ChangeMenuOption(parameters.globe, MenuOptions.Globe, false, null);
    }

    var smoothGrid;
    if (parameters.hasOwnProperty("smoothGrid")) {
        if (parameters.smoothGrid == 'true') {
            smoothGrid = ChangeMenuOption("true", MenuOptions.SmoothGrid, false, null);
        }
    }

    var centered;
    if (parameters.hasOwnProperty("center")) {
        if (parameters.center == 'true') {
            centered = ChangeMenuOption("true", MenuOptions.PacificCentered, false, null);
        }
    }

    var timeZones;
    if (parameters.hasOwnProperty("timeZones")) {
        if (parameters.timeZones == 'true') {
            timeZones = ChangeMenuOption("true", MenuOptions.TimeZone, false, null);
        }
    }

    var latLon;
    if (parameters.hasOwnProperty("latlon")) {
        if (parameters.latlon == 'true') {
            latLon = ChangeMenuOption("true", MenuOptions.LatLon, false, null);
        }
    }

    var rivers;
    if (parameters.hasOwnProperty("rivers")) {
        rivers = ChangeMenuOption(parameters.rivers, MenuOptions.Rivers, false, null);
    }

    var coasts;
    if (parameters.hasOwnProperty("coasts")) {
        coasts = ChangeMenuOption(parameters.coasts, MenuOptions.Coasts, false, null);
    }

    var lakes;
    if (parameters.hasOwnProperty("lakes")) {
        lakes = ChangeMenuOption(parameters.lakes, MenuOptions.Lakes, false, null);
    }

    var minorIslands;
    if (parameters.hasOwnProperty("minorIslands")) {
        minorIslands = ChangeMenuOption(parameters.minorIslands, MenuOptions.MinorIslands, false, null);
    }

    $.when(database, timeZones, rivers, minorIslands, bumpMapping, lakes,coasts, centered, globe, latLon, geoLines).then(function(){

        // database

        // Level_id
        if (parameters.hasOwnProperty("level")) {
            changeLevel(LayerSettings.Level_ID.toString());
            $("#levelRadio" + LayerSettings.Level_ID).prop('checked', true).button("refresh");
        }

        // Globe
        if (parameters.hasOwnProperty("globe")) {
            GlobeViewSettings(parameters.globe, false);
            displaySettings.globeView = parameters.globe;
            var id = GetMenuOption(MenuOptions.Globe, parameters.globe).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // Bump Mapping
        if (parameters.hasOwnProperty("bumpMapping")) {
            if (parameters.bumpMapping.length > 0) {
                displaySettings.lightingEnabled = true;
            } else {
                displaySettings.lightingEnabled = false;
            }
            var id = GetMenuOption(MenuOptions.BumpMapping, parameters.bumpMapping).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // GeoLines
        if (parameters.hasOwnProperty("geoLines")) {
            if (parameters.geoLines == 'true') {
                displaySettings.geoLines = true;
            } else {
                displaySettings.geoLines = false;
            }
            var id = GetMenuOption(MenuOptions.GeoLines, parameters.geoLines).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // SmoothGrid
        if (parameters.hasOwnProperty("smoothGrid")) {
            if (parameters.smoothGrid == 'true') {
                displaySettings.smoothGridBoxValues = true;
            } else {
                displaySettings.smoothGridBoxValues = false;
            }
            var id = GetMenuOption(MenuOptions.SmoothGrid, parameters.smoothGrid.toString()).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // Pacific Centered
        if (parameters.hasOwnProperty("center")) {
            if (parameters.center == 'true') {
                displaySettings.pacificCenter = true;
            } else {
                displaySettings.pacificCenter = false;
            }
            var id = GetMenuOption(MenuOptions.PacificCentered, displaySettings.pacificCenter.toString()).id;
            $("#" + id).prop('checked', true).button("refresh");

        }

        // Timezone
        if (parameters.hasOwnProperty("timeZones")) {
            if (parameters.timeZones == 'true') {
                displaySettings.timeZones = true;
            } else {
                displaySettings.timeZones = false;
            }
            var id = GetMenuOption(MenuOptions.TimeZone, parameters.timeZones.toString()).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // LatLon
        if (parameters.hasOwnProperty("latlon")) {
            if (parameters.latlon == 'true') {
                displaySettings.latLons = true;
            } else {
                displaySettings.latLons = false;
            }
            var id = GetMenuOption(MenuOptions.LatLon, parameters.latlon.toString()).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // Rivers
        if (parameters.hasOwnProperty("rivers"))
        {
            if (parameters.rivers.length > 0) {
                displaySettings.rivers = true;
            } else {
                displaySettings.rivers = false;
            }
            var id = GetMenuOption(MenuOptions.Rivers, parameters.rivers).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // Coasts
        if (parameters.hasOwnProperty("coasts"))
        {
            displaySettings.CoastsType = parameters.coasts;
            if (parameters.coasts.length > 0) {
                displaySettings.coasts = true;
            } else {
                displaySettings.coasts = false;
            }
            var id = GetMenuOption(MenuOptions.Coasts, parameters.coasts).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // Lakes
        if (parameters.hasOwnProperty("lakes"))
        {
            displaySettings.LakesType = parameters.coasts;
            if (parameters.lakes.length > 0) {
                displaySettings.lakes = true;
            } else {
                displaySettings.lakes = false;
            }
            var id = GetMenuOption(MenuOptions.Lakes, parameters.lakes).id;
            $("#" + id).prop('checked', true).button("refresh");
        }

        // Minor Islands
        if (parameters.hasOwnProperty("minorIslands")) {
            if (parameters.minorIslands == 'true') {
                displaySettings.minorIslands = true;
            } else {
                displaySettings.minorIslands = false;
            }
            var id = GetMenuOption(MenuOptions.MinorIslands, displaySettings.minorIslands.toString()).id;
            $("#" + id).prop('checked', true).button("refresh");

        }
        callback();
    });
}


function webGLStart() {

    //window.history.pushState("","",uri.search());
    var menu = document.getElementById("dynamicMenu");
    menu.appendChild(generateList(MenuData));
    $("#datasetMenu").menu({
        select: function (event, ui) {
            ChangeDatasetMenu(ui, 1);
        }
    });

    var menu = document.getElementById("colormapDynamicMenu");
    menu.appendChild(generateColorMapList(ColorMenuData));
    $("#colormapMenu").menu({
        select: function (event, ui) {
            ChangeColorMap(ui, function(){
                worldBuffers();
                drawLegend();
            });
        }
    });

    displaySettings.lightDirection = vec3.create();
    vec3.normalize(displaySettings.lightDirection, [-1.0, 0.0, 0.0]);
    displaySettings.lightAmbient = [0.2, 0.2, 0.2];
    displaySettings.lightDirectionColor = [1.0, 1.0, 1.0];

    var canvas = document.getElementById("webgl-canvas");
    var w = Math.min(document.documentElement.clientWidth, window.innerWidth || 0) - 20;
    var h = Math.min(document.documentElement.clientHeight, window.innerHeight || 0) - 20;

    canvas.width = w;
    canvas.height = h;
    initGL(canvas);
    initShaders();
    initBuffers();
    initTextures("images/earth_normalmap_flat_8192x4096.jpg");

    var timeSeries = document.getElementById("timeSeriesBox");
    timeSeries.width = w;
    timeSeries.height = h;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    document.onmouseup = function () {
        handleMouseUp(canvas, event);
    };
    canvas.onmousedown = handleMouseDown;
    document.onmousemove = handleMouseMove;

    canvas.addEventListener('mousewheel', handleMouseWheel, false);

    document.addEventListener('touchend', function () {
        handleMouseUp(canvas, event);
    }, false);
    canvas.addEventListener('touchstart', handleMouseDown, false);
    document.addEventListener('touchmove', handleMouseMove, false);


    $("div#divTitle").text(LayerSettings.FullName);
    zoomLevel = -165;

    SetOptionsFromUrl(function(){initBuffers()});

    tick();
}