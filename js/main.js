$(function () {
	
	var createRipple = function (width, height, origin) {
		
		canvas = $('<canvas/>').appendTo('body');
		canvas = canvas.get(0);
		canvas.width = width;
		canvas.height = height;
		
		var context = canvas.getContext("2d");
		context.save();
		context.fillStyle = "#FFF";
		context.fillRect(0, 0, width, height);
		context.fillStyle = "#000";
		
		return new interference.Ripple({
			context: context,
			canvas: canvas,
			origin: origin
		});
	};

	var leftRipple = createRipple(400, 300, { x: 100, y: 150 });
	var rightRipple = createRipple(400, 300, { x: 300, y: 150 });
	
	setInterval(function () {
		leftRipple.step();
		rightRipple.step();
	}, 50);
});