$(function () {
	var canvasSize = 500;
	
	canvas = $('<canvas/>').appendTo('body');
	canvas = canvas.get(0);
	canvas.height = canvasSize;
	canvas.width = canvasSize;
	
	var context = canvas.getContext("2d");
	context.save();
	context.fillStyle = "#FFF";
	context.fillRect(0, 0, canvasSize, canvasSize);
	context.fillStyle = "#000";
	
	var ripple = new interference.Ripple({
		context: context,
		canvas: canvas,
		origin: {
			x: canvas.width / 2,
			y: canvas.height / 2
		}
	});
	
	setInterval(function () { ripple.step(); }, 50);
});