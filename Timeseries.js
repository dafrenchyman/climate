/**
 * Created by mrsharky on 2/15/16.
 */

var TimeSeriesChart;
var FinalTimeSeriesData;
function GenerateFirstTimeSeriesChart(level_id) {
    if (LayerSettings.CurrGridBoxId > 0) {

        RawTimeseriesData.ValueFinal = ProcessRawDataValue(RawTimeseriesData.Value);
        FinalTimeSeriesData = new Map();

        var Dates = [];
        var Values = [];
        for (counter = 0; counter < RawTimeseriesData.ValueFinal.length; counter++) {
            var currDate = RawTimeseriesData.Date[counter];
            var currValue = RawTimeseriesData.ValueFinal[counter];
            Dates.push(currDate);
            Values.push(currValue);
        }
        FinalTimeSeriesData.set(level_id, {Date: Dates, Value: Values});

        var timeSeriesArray = [];
        var timeData_date = FinalTimeSeriesData.get(level_id).Date.slice(0);
        timeData_date.unshift("Date");
        var timeData_data = FinalTimeSeriesData.get(level_id).Value.slice(0);
        var levelIndex = Levels.Level_ID.indexOf(level_id.toString());
        var levelName = Levels.Name[levelIndex];
        timeSeriesArray.push(timeData_date);
        timeData_data.unshift(levelName);
        timeSeriesArray.push(timeData_data);

        TimeSeriesChart = c3.generate({
            bindto: '#TimeSeriesChart',
            data: {
                x: 'Date',
                columns: timeSeriesArray,
                onclick: function (d, element) {
                    ChangeDate(RawTimeseriesData.Date[d.index], function(){LoadSphereData(LayerSettings);});
                }
            },
            axis: {
                x: {
                    label: 'Date',
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m'
                    }
                },
                y: {
                    label: "Temperature (" + LayerSettings.TemperatureSymbol + ")"
                }
            },
            zoom: { enabled: true },
            transition:  {duration: 0}
        });
    }
}

/***
 *
 * @param level_id
 * @constructor
 */
function RemoveLevelFromTimeSeries(level_id) {
    var levelIndex = Levels.Level_ID.indexOf(level_id.toString());
    var levelName = Levels.Name[levelIndex];
    TimeSeriesChart.load({
        unload: [levelName]
    });
}

function AddLevelsToTimeSeries(level_id) {
    if (LayerSettings.CurrGridBoxId > 0) {
        if (!FinalTimeSeriesData.has(level_id)) {
            RawTimeseriesData.ValueFinal = ProcessRawDataValue(RawTimeseriesData.Value);
            var Dates = [];
            var Values = [];
            for (counter = 0; counter < RawTimeseriesData.ValueFinal.length; counter++) {
                var currDate = RawTimeseriesData.Date[counter];
                var currValue = RawTimeseriesData.ValueFinal[counter];
                Dates.push(currDate);
                Values.push(currValue);
            }
            FinalTimeSeriesData.set(level_id, {Date: Dates, Value: Values});
        }

        var timeSeriesArray = [];
        var timeData_data = FinalTimeSeriesData.get(level_id).Value.slice(0);
        var levelIndex = Levels.Level_ID.indexOf(level_id.toString());
        var levelName = Levels.Name[levelIndex];
        timeData_data.unshift(levelName);
        timeSeriesArray.push(timeData_data);
        TimeSeriesChart.load({
            columns: timeSeriesArray
        });
    }
}

function createCsvFromTimeseriesData() {
    var csvContent = "data:text/csv;charset=utf-8,";

    // Create the header
    csvContent += "Level Name,Date,Value\n";

    if (FinalTimeSeriesData.size > 0) {
        FinalTimeSeriesData.forEach(function (currTimeData, level_id) {
            var levelIndex = Levels.Level_ID.indexOf(level_id.toString());
            var levelName = Levels.Name[levelIndex];

            for (var i = 0; i < currTimeData.Date.length; i++) {
                var dataString = levelName + "," + currTimeData.Date[i] + "," + currTimeData.Value[i];
                csvContent += dataString + "\n";
            }
        }, FinalTimeSeriesData);

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", LayerSettings.DatabaseStore +
          "_Timeseries_Lat" + LayerSettings.CurrGridBoxLat +
          "_Lon" + LayerSettings.CurrGridBoxLon + ".csv");
        link.click();
    } else {
        $( "#dialogNoData" ).dialog( "open" );
    }

    /*if (RawTimeseriesData.Level_ID.length > 0) {
        for (var i = 0; i < RawTimeseriesData.Level_ID.length; i++) {

            var currLevelId = RawTimeseriesData.Level_ID[i];
            var levelIndex = Levels.Level_ID.indexOf(currLevelId.toString());
            var levelName = Levels.Name[levelIndex];

            var dataString = levelName + "," + RawTimeseriesData.Date[i] + "," + RawTimeseriesData.ValueFinal[i];
            csvContent += dataString + "\n";
        }

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", LayerSettings.DatabaseStore +
          "_Timeseries_Lat" + LayerSettings.CurrGridBoxLat +
          "_Lon" + LayerSettings.CurrGridBoxLon + ".csv");
        link.click();
    */
}

