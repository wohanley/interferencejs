$(function () {

	interference.RingWave = function (options) {
		
		this._reaper = options.reaper;
		this._context = options.context;
		this._origin = options.origin;
		this._velocity = options.velocity;
		this._width = options.width;
		this._style = options.style;
		
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
		this._context.strokeStyle = this._style;
		
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