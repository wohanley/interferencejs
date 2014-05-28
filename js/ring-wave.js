$(function () {

	var ringWaveDefaults = {
		velocity: 5, // in pixels per step
		width: 5 // in pixels
	};
	
	interference.RingWave = function (options) {
		
		var settings = $.extend({}, ringWaveDefaults, options);
		
		this._reaper = settings.reaper;
		this._context = settings.context;
		this._origin = settings.origin;
		this._velocity = settings.velocity;
		this._width = settings.width;
		
		this._radius = 0;
	};

	interference.RingWave.prototype.step = function () {
		this._radius += this._velocity;
		
		if (this._contextEscaped()) {
			this._reaper.destroy(self);
		} else {
			this._draw();
		}
	};
	
	interference.RingWave.prototype._draw = function () {
		this._context.save();
		
		this._context.lineWidth = this._width;
		this._context.strokeStyle = '#000';
		this._context.globalAlpha = 0.5;
		
		this._context.beginPath();
		this._context.arc(
			this._origin.x,
			this._origin.y,
			this._radius,
			0,
			2 * Math.PI
		);
		this._context.stroke();
		
		this._context.restore();
	};
	
	interference.RingWave.prototype._contextEscaped = function () {
		return false;
	};
});