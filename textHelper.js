/**
 * Created by mrsharky on 3/27/16.
 */

//


var textCtx = document.createElement("canvas").getContext("2d");

// Puts text in center of canvas.
function makeTextCanvas(text, width, height) {
	textCtx.canvas.width  = width;
	textCtx.canvas.height = height;
	textCtx.font = "20px monospace";
	textCtx.textAlign = "center";
	textCtx.textBaseline = "middle";
	textCtx.fillStyle = "black";
	textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);
	textCtx.fillText(text, width / 2, height / 2);
	return textCtx.canvas;
}