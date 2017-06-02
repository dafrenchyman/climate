/**
 * Created by mrsharky on 11/5/16.
 */

	// GUI Functions
$(function () {
	$("#accordion1").accordion({
		collapsible: true,
		heightStyle: "content"
	});

	$("#slider_year").slider({
		min: 1851,
		max: 2011,
		value: 2000,
		slide: function (event, ui) {
			$("#year").val(ui.value);
		},
		change: function (event, ui) {
			ChangeYear(ui.value);
		}
	});
	$("#year").val($("#slider_year").slider("value"));
	$("#year").change(function () {
		$("#slider_year").slider("value", this.value);
	});

	// Radio buttons
	{
		$("#animateRadio").buttonset();
		$("#coastsRadio").buttonset();
		$("#latLonRadio").buttonset();
		$("#riversRadio").buttonset();
		$("#lakesRadio").buttonset();
		$("#3dGlobeRadio").buttonset();
		$("#smoothGridRadio").buttonset();
		$("#bumpMapGridRadio").buttonset();
		$("#pacificRadio").buttonset();
		$("#geoLinesRadio").buttonset();
		$("#minorIslandsRadio").buttonset();
		$("#TimezonesRadio").buttonset();
	}


	//$( "input" ).checkboxradio();


	// Dataset selection menu
	{
		//$( "#datasetMenu" ).menu();
	}

	// draggable menu
	$( "#accordionSize" ).draggable({
		containment: "#hud",
		scroll: false,
		refreshPositions: true,
		stop: function(e,ui) {
			$("#accordionSize").hover(
					function(){inMenu = true;},
					function(){inMenu = false;}
			)
		}
	});

	// Menu hide/unhide
	{
		// run the currently selected effect
		function runEffect() {
			// run the effect
			$("#effect").toggle("blind", {}, 1000);
		};

		// set effect from select menu value
		$("#button").click(function () {
			runEffect();
		});
	}

	// Dataset selection menu
	{
		$('#datasetMenu').menu({
			select: function (event, ui) {
				alert(ui.item.text());
			}
		});
	}

	// Download data
	{
		$("#dialogNoData").dialog({
			autoOpen: false,
			show: {
				effect: "fade",
				duration: 200
			},
			hide: {
				effect: "fade",
				duration: 200
			}
		});
	}

	// ColorMapMenu
	{
		$("#colormapSelectMenu").selectmenu({
			change: function (event, data) {
				changeColorMap(data.item.value);
			}
		});
	}

	// Month
	{
		$("#monthMenu").selectmenu({
			change: function (event, data) {
				ChangeMonth(data.item.value);
			}
		});
	}
});

function changeBumpMapping(y) {
	var menuOption = GetMenuOption(MenuOptions.BumpMapping, y);
	if (menuOption.file.length > 0) {
		displaySettings.lightingEnabled = true;
		initTextures(menuOption.file);
	} else {
		displaySettings.lightingEnabled = false;
	}
	var uri = new URI(window.location.href);
	uri.removeSearch("bumpMapping");
	uri.addSearch("bumpMapping", y);
	window.history.replaceState("","",uri.search());
}

function changeLevel(y, functionToCall) {
	LayerSettings.Level_ID = y;
	var index = Levels.Level_ID.indexOf(y);
	LayerSettings.LevelName = Levels.Name[index];
	if (!(functionToCall === undefined)) {
		functionToCall();
	}

	var uri = new URI(window.location.href);
	uri.removeSearch("level");
	uri.addSearch("level", y);
	window.history.replaceState("","",uri.search());
}

function ChangeSmoothGridMenu(y) {
	ChangeMenuOption(y, MenuOptions.SmoothGrid, true, function(){
		var uri = new URI(window.location.href);
		uri.removeSearch("smoothGrid");
		if (y == "true") {
			displaySettings.smoothGridBoxValues = true;
			uri.addSearch("smoothGrid", true);
		} else {
			displaySettings.smoothGridBoxValues = false;
			uri.addSearch("smoothGrid", false);
		}
		window.history.replaceState("", "", uri.search());
		worldBuffers();
	});
}

function GlobeViewSettings(y, resetView) {
	switch (y) {
		case "3d":
			displaySettings.globeView = "3d";
				if (resetView) {
					xMovement = 0;
					yMovement = 0;
					zoomLevel = 80;
				}
			break;
		case "ortho":
			displaySettings.globeView = "ortho";
				if (resetView) {
					xMovement = 0;
					yMovement = 0;
					zoomLevel = -165;
				}
			break;
		case "2d":
			displaySettings.globeView = "2d";
				if (resetView) {
					mat4.identity(earthRotationMatrix);
					mat4.identity(earthRotationMatrix_x);
					mat4.identity(earthRotationMatrix_y);
					xMovement = 0;
					yMovement = 0;
					zoomLevel = 70;
				}
			break;
		default:
			break;
	}
}

function changeGlobeView(y) {
	GlobeViewSettings(y, true);
	return ChangeMenuOption(y, MenuOptions.Globe, true, function(){
		var uri = new URI(window.location.href);
		displaySettings.LakesType = y;
		uri.removeSearch("globe");
		uri.addSearch("globe", y);
		window.history.replaceState("","",uri.search());
		initBuffers();
	});
}

function ChangeCenterMenu(y) {
	ChangeMenuOption(y, MenuOptions.PacificCentered, true, function(){
		var uri = new URI(window.location.href);
		uri.removeSearch("center");
		if (y == "true") {
			displaySettings.pacificCenter = true;
			uri.addSearch("center", true);
		} else {
			displaySettings.pacificCenter = false;
			uri.addSearch("center", false);
		}
		window.history.replaceState("", "", uri.search());
		initBuffers();
	});
}


function ChangeTimeSeries(y) {
	var level_id = y.name.replace("timeseries_", "");

	if (y.checked) {
		AddTimeseriesData(LayerSettings, level_id);
	} else {
		RemoveLevelFromTimeSeries(level_id);

	}
	//display("Clicked, new value = " + y.checked);

}

var MenuOptions = {
	BumpMapping: {
		values: [
			{
				option: "land",
				file: "images/earth_normalmap_flat_8192x4096.jpg",
				id: "bumpMapGridRadio1"
			},
			{
				option: "landOcean",
				file: "images/earth_normalmap_8192x4096.jpg",
				id: "bumpMapGridRadio2"
			},
			{
				option: "",
				file: "",
				id: "bumpMapGridRadio3"
			},
		]
	},
	Globe: {
		values: [
			{
				option: "3d",
				file: "",
				id: "3dGlobeRadio1"
			}, {
				option: "ortho",
				file: "",
				id: "3dGlobeRadio2"
			}, {
				option: "2d",
				file: "",
				id: "3dGlobeRadio3"
			}
		]
	},
	SmoothGrid: {
		values: [
			{
				option: "true",
				file: "",
				id: "smoothGridRadio1"
			}, {
				option: "false",
				file: "",
				id: "smoothGridRadio2"
			}
		]
	},
	PacificCentered: {
		values: [
			{
				option: "true",
				file: "",
				id: "pacificRadio1"
			}, {
				option: "false",
				file: "",
				id: "pacificRadio1"
			}
		]
	},
	TimeZone: {
		values: [
			{
				option: "true",
				file: "Coastlines/ne_10m_time_zones.js",
				id: "Timezones1"
			},{
				option: "false",
				file: "",
				id: "Timezones2"
			}
		]
	},
	MinorIslands: {
		values: [
			{
				option: "true",
				file: "Coastlines/ne_10m_minor_islands_coastline.js",
				id: "minorIslandsRadio1"
			},{
				option: "false",
				file: "",
				id: "minorIslandsRadio2"
			}
		]
	},
	Lakes: {
		values: [
			{
				option: "110m",
				file: "Coastlines/ne_110m_lakes.js",
				id: "lakesRadio1"
			}, {
				option: "50m",
				file: "Coastlines/ne_50m_lakes.js",
				id: "lakesRadio2"
			}, {
				option: "10m",
				file: "Coastlines/ne_10m_lakes.js",
				id: "lakesRadio3"
			}, {
				option: "",
				file: "",
				id: "lakesRadio4"
			}
		]
	},
	Coasts: {
		values: [
			{
				option: "110m",
				file: "Coastlines/ne_110m_coastline.js",
				id: "coastsRadio1"
			}, {
				option: "50m",
				file: "Coastlines/ne_50m_coastline.js",
				id: "coastsRadio2"
			}, {
				option: "10m",
				file: "Coastlines/ne_10m_coastline.js",
				id: "coastsRadio3"
			}, {
				option: "",
				file: "",
				id: "coastsRadio4"
			}
		]
	},
	Rivers: {
		values: [
			{
				option: "110m",
				file: "Coastlines/ne_110m_rivers_lake_centerlines.js",
				id: "riversRadio1"
			},{
				option: "50m",
				file: "Coastlines/ne_50m_rivers_lake_centerlines.js",
				id: "riversRadio2"
			},{
				option: "10m",
				file: "Coastlines/ne_10m_rivers_lake_centerlines.js",
				id: "riversRadio3"
			},{
				option: "",
				file: "",
				id: "riversRadio4"
			}]
	},
	GeoLines: {
		values: [
			{
				option: "true",
				file: "Coastlines/ne_10m_geographic_lines.js",
				id: "geoLinesRadio1"
			}, {
				option: "false",
				file: "",
				id: "geoLinesRadio2"
			}
		]
	},
	LatLon: {
		values: [
			{
				option: "true",
				file: "",
				id: "latLonRadio1"
			}, {
				option: "false",
				file: "",
				id: "latLonRadio2"
			}
		]
	}
};

function ChangeMinorIslandsMenu(y) {
	ChangeMenuOption(y, MenuOptions.MinorIslands, true, function(){
		var uri = new URI(window.location.href);
		if (y == "true") {
			displaySettings.timeZones = true;
			uri.removeSearch("minorIslands");
			uri.addSearch("minorIslands", true);
			window.history.replaceState("", "", uri.search());
		} else {
			displaySettings.timeZones = false;
			uri.removeSearch("minorIslands");
			uri.addSearch("minorIslands", false);
			window.history.replaceState("","",uri.search());
		}
		lineBuffers();
	});
}

function ChangeRiversMenu(y) {
	ChangeMenuOption(y, MenuOptions.Rivers, true, function(){
		var uri = new URI(window.location.href);
		displaySettings.currRivers = y;
		uri.removeSearch("rivers");
		uri.addSearch("rivers", y);
		window.history.replaceState("","",uri.search());
		if (y == "") {
			displaySettings.rivers = false;
		} else {
			displaySettings.rivers = true;
		}
		lineBuffers();
	});
}

function ChangeCoastsMenu(y) {
	ChangeMenuOption(y, MenuOptions.Coasts, true, function(){
		var uri = new URI(window.location.href);
		displaySettings.CoastsType = y;
		uri.removeSearch("coasts");
		uri.addSearch("coasts", y);
		window.history.replaceState("","",uri.search());
		if (y == "") {
			displaySettings.coasts = false;
		} else {
			displaySettings.coasts = true;
		}
		lineBuffers();
	});
}

function ChangeLakesMenu(y) {
	ChangeMenuOption(y, MenuOptions.Lakes, true, function(){
		var uri = new URI(window.location.href);
		displaySettings.LakesType = y;
		uri.removeSearch("lakes");
		uri.addSearch("lakes", y);
		window.history.replaceState("","",uri.search());
		if (y == "") {
			displaySettings.lakes = false;
		} else {
			displaySettings.lakes = true;
		}
		lineBuffers();
	});
}

function ChangeTimeZonesMenu(y) {
	ChangeMenuOption(y, MenuOptions.TimeZone, true, function(){
		var uri = new URI(window.location.href);
		if (y == "true") {
			displaySettings.timeZones = true;
			uri.removeSearch("timeZones");
			uri.addSearch("timeZones", true);
			window.history.replaceState("", "", uri.search());
		} else {
			displaySettings.timeZones = false;
			uri.removeSearch("timeZones");
			uri.addSearch("timeZones", false);
			window.history.replaceState("","",uri.search());
		}
		lineBuffers();
	});
}

function GetMenuOption(menuOption, y) {
	for (var counter = 0; counter < menuOption.values.length; counter++) {
		if (menuOption.values[counter].option == y) {
			return menuOption.values[counter];
		}
	}
	return null;
}

function ChangeMenuOption(y, menuOption, callbackNow, callbackFunc) {

	// Get values from uri
	var uri = new URI(window.location.href);
	var scriptToLoad = $.Deferred();
	scriptToLoad.resolve();
	var menu = GetMenuOption(menuOption, y);
	var filename = menu.file;
	if (filename.length > 0) {
		scriptToLoad = $.getScript(filename);
	}
	if (callbackNow == true) {
		$.when(scriptToLoad).done(function () {
			callbackFunc();
		})
	}
	return scriptToLoad;
}

function ChangeGeoLinesMenu(y) {
	ChangeMenuOption(y, MenuOptions.GeoLines, true, function(){
		var uri = new URI(window.location.href);
		uri.removeSearch("geoLines");
		if (y == "true") {
			displaySettings.geoLines = true;
			uri.addSearch("geoLines", true);
		} else {
			displaySettings.geoLines = false;
			uri.addSearch("geoLines", false);
		}
		window.history.replaceState("", "", uri.search());
		lineBuffers();
	});
}

function ChangeLatLonMenu(y) {
	ChangeMenuOption(y, MenuOptions.LatLon, true, function(){
		var uri = new URI(window.location.href);
		uri.removeSearch("latlon");
		if (y == "true") {
			displaySettings.latLons = true;
			uri.addSearch("latlon", true);
		} else {
			displaySettings.latLons = false;
			uri.addSearch("latlon", false);
		}
		window.history.replaceState("", "", uri.search());
		lineBuffers();
	});
}

function ChangeAnimate(value) {
	LayerSettings.animate = value;
	AnimateTime();
}

function AnimateTime() {

	var monthsToJump = $("#monthJump")[0].value;
	var newDate = moment(LayerSettings.CurrDate, "YYYY-MM-DD").add(monthsToJump,"M");
	var maxDate = moment(LayerSettings.EndDate);
	var minDate = moment(LayerSettings.StartDate);

	// If the date is <= maxDate, animate
	if (newDate.isSameOrBefore(maxDate) && LayerSettings.animate == "true" &&
			newDate.isSameOrAfter(minDate)) {
		ChangeDate(newDate.format("YYYY-MM-DD"), function(){LoadSphereData(LayerSettings);});
		setTimeout(function(){
			AnimateTime();
		},5000);
	} else {
		LayerSettings.animate = false;
		return;
	}

}

function animate() {
	var timeNow = new Date().getTime();
	if (lastTime != 0) {
		var elapsed = timeNow - lastTime;
		//rGlobe -= (5 * elapsed) / 1000.0;
	}
	lastTime = timeNow;
}

function ChangeColorMap(ui, callback) {
	var item = ui.item.children();

	displaySettings.currColormapName = item.attr('FullName');

	var currColorMap = ColorMaps.filter(function (obj) {
		return obj.FullName == displaySettings.currColormapName;
	});

	//displaySettings.currColorMap = currColorMap[0].ColorMap;
	displaySettings.functionForColorMap = currColorMap[0].Function;
	callback();

	var locationColorMap = GetLocationOfColorMap(currColorMap[0].FullName);
	var uri = new URI(window.location.href);
	uri.removeSearch("colorMap");
	uri.addSearch("colorMap", locationColorMap);
	window.history.replaceState("", "", uri.search());
}

function ChangeUpperBoundMenu(upperBound) {
	LayerSettings.maxValue = upperBound;
	worldBuffers();
	drawLegend();
}

function ChangeLowerBoundMenu(lowerBound) {
	LayerSettings.minValue = lowerBound;
	worldBuffers();
	drawLegend();
}

function ChangeDate(newDate, functionToRun) {
	LayerSettings.CurrDate = newDate;
	var newYear = parseInt(newDate.substring(0, 4));
	var newMonth = parseInt(newDate.substring(5, 7));
	$("#slider_year").slider(newYear);
	//$('#mySelect option[value="fg"]').attr('selected', true)
	$('#monthMenu option[value="' + newDate.substring(5, 7) + '"]').attr('selected', "selected").attr("selected", true);
	$("#monthMenu").selectmenu("refresh");
	$("#levelRadio" + LayerSettings.Level_ID).prop('checked', true).button("refresh");
	$('#year').val(newYear.toString());

	if (!(functionToRun === undefined)) {
		functionToRun();
	}
	var uri = new URI(window.location.href);
	uri.removeSearch("date");
	uri.addSearch("date", LayerSettings.CurrDate);
	window.history.replaceState("", "", uri.search());
}

function ChangeMonth(newMonth) {
	var currYear = LayerSettings.CurrDate.substring(0, 4);
	var newDate = currYear + "-" + newMonth + "-01";
	ChangeDate(newDate, function(){LoadSphereData(LayerSettings)});
}

function ChangeYear(newYear) {
	newYear = padLeft(newYear, 4);
	var currMonth = LayerSettings.CurrDate.substring(5, 7);
	var newDate = newYear + "-" + currMonth + "-01";
	ChangeDate(newDate, function(){LoadSphereData(LayerSettings)});
}

function createCsvFromGriddedData() {
	var csvContent = "data:text/csv;charset=utf-8,";

	// Create the header
	csvContent += "Latitude,Longitude,Value\n";
	if (RawData.Lat.length > 0) {
		for (var i = 0; i < RawData.Lat.length; i++) {
			var dataString = RawData.Lat[i] + "," + RawData.Lon[i] + "," + RawData.ValueFinal[i];
			csvContent += dataString + "\n";
		}

		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", LayerSettings.DatabaseStore + "_GridData_" + LayerSettings.CurrDate + ".csv");
		link.click();
	} else {
		$("#dialogNoData").dialog("open");
	}
}

function ChangeDatasetMenu(ui, level_id) {
	var item = ui.item.children();
	var currDataset = GetDatasetByStore(item.attr('DatabaseStore'));
	ChangeDataset(currDataset, level_id, function(){
		worldBuffers();
		if (RawData.Lat.length > 0) {
			drawLegend();
		}
	});
}

function ChangeDataset(dataset, level_id, callbackFunc) {
	return ChangeDatasetDate(dataset, dataset.StartDate, level_id, callbackFunc);
}

function ChangeDatasetDate(dataset, currDate, level_id, callbackFunc) {

	LayerSettings.FullName = dataset.FullName;
	LayerSettings.CurrDate = currDate;
	LayerSettings.StartDate = dataset.StartDate;
	LayerSettings.EndDate = dataset.EndDate;
	LayerSettings.DatabaseStore = dataset.DatabaseStore;
	LayerSettings.Dataset_ID = dataset.Dataset_ID;
	LayerSettings.OriginalLocation = dataset.OriginalLocation;
	LayerSettings.Level_ID = level_id;
	LayerSettings.DataUnits = dataset.Units;
	LayerSettings.LevelName = dataset.DefaultLevel;
	var yearMin = LayerSettings.StartDate.substring(0, 4);
	var yearMax = LayerSettings.EndDate.substring(0, 4);
	$("#slider_year").slider({
		min: parseInt(yearMin),
		max: parseInt(yearMax),
		value: parseInt(LayerSettings.CurrDate.substring(0, 4))
	});
	var levelDeferred = LoadLevelDataMenu(LayerSettings);
	$.when(levelDeferred).then(sphereDeferred = LoadSphereDataMenu(LayerSettings, callbackFunc));

	$("div#divYearMin").text(yearMin);
	$("div#divYearMax").text(yearMax);
	$("div#divTitle").text(LayerSettings.FullName);
	//$("div#gridBoxSize").style("display", "none");
	document.getElementById("gridBoxSize").style.display = "none";
	return $.when(levelDeferred);
}