/**
 * Created by mrsharky on 2/15/16.
 */

/***
 *
 */
function drawLegend() {
    var w = 140, h = 400;

    d3.select("#legend").selectAll("svg").remove();
    var key = d3.select("#legend").append("svg").attr("width", w).attr("height", h);
    var legend = key.append("defs").append("svg:linearGradient").attr("id", "gradient").attr("x1", "100%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");

    var colorMap = GetColorMap(displaySettings.currColormapName);

    for (var currPercentage = 0; currPercentage <= 1.0; currPercentage += 0.05)
    {
        var offsetString = (currPercentage * 100).toString() + "%";
        var currColors;
        if (displaySettings.functionForColorMap == "customColorMap") {
            currColors = customColorMapByPercentage(colorMap, 0.0, 1.0, 1.0 - currPercentage);
        } else if (displaySettings.functionForColorMap == "customColorMapWithMidpoint") {
            currColors = customColorMapWithMidpointByPercentage(colorMap, parseFloat(LayerSettings.minValue), 0.0, parseFloat(LayerSettings.maxValue), 1.0 - currPercentage);
        }

        var colorsHex = rgbToHex(Math.round(currColors[0]*255),
            Math.round(currColors[1]*255),
            Math.round(currColors[2]*255));
        legend.append("stop").attr("offset", offsetString).attr("stop-color", colorsHex).attr("stop-opacity", 1);
    }

    //legend.append("stop").attr("offset", "100%").attr("stop-color", "#FEE8c8").attr("stop-opacity", 1);

    key.append("rect").attr("width", w - 100).attr("height", h - 100).style("fill", "url(#gradient)").attr("transform", "translate(0,10)");

    var y = d3.scale.linear().range([300, 0]).domain([LayerSettings.minValue, LayerSettings.maxValue]);

    var yAxis = d3.svg.axis().scale(y).orient("right");
    //yAxis.style("color", "white");

    key.append("g").attr("class", "y axis").attr("transform", "translate(41,10)").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 50).attr("dy", ".71em").style("text-anchor", "end").text("Temperature (" + LayerSettings.TemperatureSymbol + ")");
}
