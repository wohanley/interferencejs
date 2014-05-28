$(function () {
	
	var rippleDefaults = {
		frequency: 12,
		velocity: 5
	};

	interference.Ripple = function (options) {
		
		var settings = $.extend({}, rippleDefaults, options);
		
		this._context = settings.context;
		this._canvas = settings.canvas;
		this._origin = settings.origin;
		this._frequency = settings.frequency;
		
		this._stepCount = 0;
		this._rings = [];
	};
	
	interference.Ripple.prototype.destroy = function (ring) {
		this._rings.splice(this._rings.indexOf(ring), 1);
	};

	interference.Ripple.prototype.step = function () {
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
		this._moveRingsStep();
		this._newRingStep();
		this._stepCount++;
	};
	
	interference.Ripple.prototype._moveRingsStep = function () {
		for (var i = 0; i < this._rings.length; i++) {
			this._rings[i].step();
		}
	};
	
	interference.Ripple.prototype._newRingStep = function () {
		if (this._stepCount > this._frequency) {
			this._rings.push(new interference.RingWave({
				context: this._context,
				origin: this._origin,
				velocity: this._velocity,
				reaper: this
			}));
			this._stepCount = 0;
		}
	};
});