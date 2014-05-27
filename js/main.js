$(function () {
	
	var output = $('<canvas/>').appendTo('body');
	output = output.get(0);
	output.width = 400;
	output.height = 300;
	
	var sum = new interference.CanvasSummer({
		output: output
	});
	
	var createRipple = function (width, height, origin, invert) {
		
		canvas = $('<canvas class="component" />').appendTo('body');
		canvas = canvas.get(0);
		canvas.width = width;
		canvas.height = height;
		
		sum.components.push(canvas);
		
		return new interference.Ripple({
			context: canvas.getContext("2d"),
			canvas: canvas,
			origin: origin,
			invert: invert
		});
	};

	var leftRipple = createRipple(400, 300, { x: 100, y: 150 }, false);
	var rightRipple = createRipple(400, 300, { x: 300, y: 150 }, true);
	
	setInterval(function () {
		leftRipple.step();
		rightRipple.step();
		sum.update();
	}, 100);
});