/**
 * Created by mrsharky on 6/23/16.
 */

var MenuItems = {};
var MenuData = [];

function LoadDatasets() {
	var head= document.getElementsByTagName('head')[0];
	try {
		head.removeChild(d.getElementById('LoadDatasets'));
	} catch (e){}
	var script = document.createElement('script');
	script.type= 'text/javascript';
	script.id = 'LoadDatasets';
	script.src= "./php/g_datasets.php";
	script.onload = function ()
	{
		// Organize the structure into something "nice" so we can load it properly
		var currId = 0;
		MenuItems.id = 0;
		for (var counter = 0; counter < Datasets.Name.length; counter++)
		{
			var datasetStructure = Datasets.Name[counter].split("|");
			var currStructure = datasetStructure;
			var currMenu = MenuItems;
			var parentId = 0;

			for (var structCounter = 0; structCounter < currStructure.length; structCounter++)
			{
				var currProperty = currStructure[structCounter];
				if(!currMenu.hasOwnProperty(currProperty)) {
					currMenu[currProperty] = {};
					currMenu[currProperty].id = ++currId;
					currMenu[currProperty].parentId = parentId;
					if (structCounter === currStructure.length - 1) {
						MenuData.push({
							id: currId,
							parentId: parentId,
							name: currProperty,
							FullName: Datasets.Name[counter],
							Dataset_ID: Datasets.Dataset_ID[counter],
							DatabaseStore: Datasets.DatabaseStore[counter],
							OriginalLocation: Datasets.OriginalLocation[counter],
							StartDate: Datasets.StartDate[counter],
							EndDate: Datasets.EndDate[counter],
							Units: Datasets.Units[counter],
							DefaultLevel: Datasets.DefaultLevel[counter]
						});
					} else {
						MenuData.push({
							id: currId,
							parentId: parentId,
							name: currProperty
						});
					}
				}
				parentId = currMenu[currProperty].id;
				currMenu = currMenu[currProperty];
			}
		}
	};
	head.appendChild(script);
}

LoadDatasets();


function LoadLevelDataMenu(settings, callbackFunc) {
	var filename = 'php/g_GetLevel.php' +'?dbname=' + settings.DatabaseStore;
	var scriptToLoad = $.getScript(filename);
	$.when(scriptToLoad).done(function () {
		// Layer Selection buttons
		$("#Levels").empty();
		for (i = 0; i < Levels.Name.length; i++) {
			var checked = '';
			if (i ==0) {
				checked = 'checked="checked"'
			}
			var level_id = Levels.Level_ID[i];
			var name = Levels.Name[i];

			// Layers
			var radioBtn = $('<input type="radio" id="levelRadio' + parseInt(level_id) +
					'" onchange="changeLevel(this.value, function(){LoadSphereData(LayerSettings);})" value="' + level_id +
					'" name="levelRadio" ' + checked + '><label for="levelRadio' + level_id + '">' + name + '</label>');
			radioBtn.appendTo('#Levels');
		}
		$("#Levels").buttonset();
		if (!(callbackFunc === undefined)) {
			callbackFunc();
		}
	});
	return scriptToLoad;
}

function LoadSphereDataMenu(settings, callbackFunc) {
	var filename = 'php/g_GetGridData.php' +'?dbname=' + settings.DatabaseStore + '&date=' + settings.CurrDate + '&level=' + settings.Level_ID;
	var scriptToLoad = $.getScript(filename);
	$.when(scriptToLoad).done(function () {
		if(LayerSettings.LevelName.length > 0) {
			$("div#divDate").text(LayerSettings.LevelName + ' | ' + LayerSettings.CurrDate);
		} else {
			$("div#divDate").text(LayerSettings.CurrDate);
		}

		RawData.ValueFinal = [];
		RawData.ValueFinal = ProcessRawDataValue(RawData.Value);
		LayerSettings.originalMaxValue = RawData.ValueFinal.max();
		LayerSettings.originalMinValue = RawData.ValueFinal.min();
		$("#upperBoundLimit").val(LayerSettings.originalMaxValue);
		$("#lowerBoundLimit").val(LayerSettings.originalMinValue);
		LayerSettings.maxValue = RawData.ValueFinal.max();
		LayerSettings.minValue = RawData.ValueFinal.min();

		if (!(callbackFunc === undefined)) {
			callbackFunc();
		}
		// Add the datasetID to the input options
		var uri = new URI(window.location.href);
		uri.removeSearch("database");
		uri.addSearch("database", settings.Dataset_ID);
		window.history.replaceState("", "", uri.search());
	});
	return scriptToLoad;
}

function LoadSphereData(settings) {
	var head= document.getElementsByTagName('head')[0];
	try {
		head.removeChild(d.getElementById('loadDataScript'));
	} catch (e){}
	var script = document.createElement('script');
	script.type= 'text/javascript';
	script.id = 'loadDataScript';
	script.src= 'php/g_GetGridData.php' +'?dbname=' + settings.DatabaseStore + '&date=' + settings.CurrDate + '&level=' + settings.Level_ID;
	script.onload = function ()
	{
		if(LayerSettings.LevelName.length > 0) {
			$("div#divDate").text(LayerSettings.LevelName + ' | ' + LayerSettings.CurrDate);
		} else {
			$("div#divDate").text(LayerSettings.CurrDate);
		}

		RawData.ValueFinal = [];
		RawData.ValueFinal = ProcessRawDataValue(RawData.Value);
		LayerSettings.originalMaxValue = RawData.ValueFinal.max();
		LayerSettings.originalMinValue = RawData.ValueFinal.min();
		$("#upperBoundLimit").val(LayerSettings.originalMaxValue);
		$("#lowerBoundLimit").val(LayerSettings.originalMinValue);
		LayerSettings.maxValue = RawData.ValueFinal.max();
		LayerSettings.minValue = RawData.ValueFinal.min();
		worldBuffers();

		if (RawData.Lat.length > 0) {
			drawLegend();
		}

		// Add the datasetID to the input options
		var uri = new URI(window.location.href);
		uri.removeSearch("database");
		uri.addSearch("database", settings.Dataset_ID);
		window.history.replaceState("", "", uri.search());
	};
	head.appendChild(script);
}

function LoadJscData(fileToLoad, callback) {
	var head= document.getElementsByTagName('head')[0];
	try {
		head.removeChild(d.getElementById('loader'));
	} catch (e){}
	var script = document.createElement('script');
	script.type= 'text/javascript';
	script.id = 'Loader';
	script.src= fileToLoad;
	script.onload = function () {
		callback();
	};
	head.appendChild(script);
}

function LoadTimeseriesData(settings) {
	var head= document.getElementsByTagName('head')[0];
	try {
		head.removeChild(d.getElementById('LoadTimeseriesData'));
	} catch (e){}
	var script = document.createElement('script');
	script.type= 'text/javascript';
	script.id = 'LoadTimeseriesData';
	script.src= 'php/g_GetTimeseriesData.php?dbname=' + settings.DatabaseStore +'&gridboxId=' + settings.CurrGridBoxId + '&level=' + settings.Level_ID;
	script.onload = function ()
	{
		document.getElementById("timeSeries").style.display = "block";

		// Set Timeseries Buttons
		$("#TimeSeriesLevels").empty();
		for (i = 0; i < Levels.Name.length; i++) {
			var checked = '';
			if (settings.Level_ID == Levels.Level_ID[i]) {
				checked = 'checked="checked"'
			}
			var level_id = Levels.Level_ID[i];
			var name = Levels.Name[i];

			var timeBtn = $('<label for="timeseries_'+ level_id + '">' + name + '</label>' +
					'<input type="checkbox" onclick="ChangeTimeSeries(this);" ' + checked + ' name="timeseries_'+ level_id + '" id="timeseries_'+ level_id +'">');
			timeBtn.appendTo('#TimeSeriesLevels');

			$( function() {
				$('input').button();
				//$( "input" ).checkboxradio();
			} );

		}

		GenerateFirstTimeSeriesChart(settings.Level_ID);
	};
	head.appendChild(script);
}

function AddTimeseriesData(settings, level_id) {
	if (!FinalTimeSeriesData.has(level_id)) {
		var head = document.getElementsByTagName('head')[0];
		try {
			head.removeChild(d.getElementById('LoadTimeseriesData'));
		} catch (e) {
		}
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = 'LoadTimeseriesData';
		script.src = 'php/g_GetTimeseriesData.php?dbname=' + settings.DatabaseStore + '&gridboxId=' + settings.CurrGridBoxId + '&level=' + level_id;
		script.onload = function () {
			document.getElementById("timeSeries").style.display = "block";
			AddLevelsToTimeSeries(level_id);
		};
		head.appendChild(script);
	} else {
		AddLevelsToTimeSeries(level_id);
	}
}