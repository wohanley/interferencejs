$(function () {
	
	var linearPeriodDefaults = {
		step: 1,
		start: 0,
		increasing: true
	};

	interference.LinearPeriod = function (options) {
		
		var settings = $.extend({}, linearPeriodDefaults, options);
		
		this._floor = settings.floor;
		this._ceiling = settings.ceiling;
		this._step = settings.step;
		this._current = settings.start;
		this.next = settings.increasing ? this._increase : this._decrease;
	};
	
	interference.LinearPeriod.prototype._increase = function () {
		if (this._current <= this._ceiling - this._step) {
			this._current += this._step;
		} else {
			this._current = this._ceiling;
			this.next = this._decrease;
		}
		
		return this._current;
	};
	
	interference.LinearPeriod.prototype._decrease = function () {
		if (this._current >= this._floor + this._step) {
			this._current -= this._step;
		} else {
			this._current = this._floor;
			this.next = this._increase;
		}
		
		return this._current;
	};

	interference.toGrey = function (value) {
		value = Math.min(255, Math.max(0, value));
		return 'rgb(' + value + ',' + value + ',' + value + ')';
	};

	interference.GreySequence = function (options) {
		this._valueSequence = new interference.LinearPeriod(options);
	};

	interference.GreySequence.prototype.next = function () {
		return interference.toGrey(this._valueSequence.next());
	};
});