$(function () {
	
	var rippleDefaults = {
		period: 1, // period of wave in steps
		velocity: 1,
		waveWidth: 2,
		invert: false
	};

	interference.Ripple = function (options) {
		
		this._backStyle = 'rgb(127, 127, 127)';
		
		var settings = $.extend({}, rippleDefaults, options);
		
		this._context = settings.context;
		this._canvas = settings.canvas;
		this._origin = settings.origin;
		this._period = settings.period;
		this._velocity = settings.velocity;
		this._waveWidth = settings.waveWidth;
		
		this._stepCount = 0;
		this._rings = [];

		this._colorSequence = new interference.GreySequence({
			invert: settings.invert
		});
	};
	
	interference.Ripple.prototype.destroy = function (ring) {
		this._rings.splice(this._rings.indexOf(ring), 1);
	};

	interference.Ripple.prototype.step = function () {
		this._context.save();
		this._context.fillStyle = this._backStyle;
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
		this._context.restore();
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
		if (this._stepCount > this._period) {
			this._rings.push(new interference.RingWave({
				context: this._context,
				origin: this._origin,
				velocity: this._velocity,
				width: this._waveWidth,
				style: this._colorSequence.next(),
				reaper: this
			}));
			this._stepCount = 0;
		}
	};
});