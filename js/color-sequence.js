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
	
	var sineDefaults = {
		start: 0,
		step: 0.5
	};
	
	interference.Sine = function (options) {
		
		var settings = $.extend({}, sineDefaults, options);
		
		this._currentX = settings.start;
		this._step = settings.step;
	};
	
	interference.Sine.prototype.next = function () {
		this._currentX += this._step;
		return Math.sin(this._currentX);
	};

	interference.toGrey = function (value) {
		value = Math.min(255, Math.max(0, Math.round(value)));
		return 'rgb(' + value + ',' + value + ',' + value + ')';
	};
	
	var greySequenceDefaults = {
		invert: false
	};

	interference.GreySequence = function (options) {
		
		var settings = $.extend({}, greySequenceDefaults, options);
		
		this._normalize = settings.invert ? this._subtractGrey : this._addGrey;
		this._valueSequence = new interference.Sine(settings);
	};
	
	interference.GreySequence.prototype._addGrey = function (value) {
		return 128 + (value * 64);
	};
	
	interference.GreySequence.prototype._subtractGrey = function (value) {
		return 128 - (value * 64);
	};

	interference.GreySequence.prototype.next = function () {
		return interference.toGrey(this._normalize(this._valueSequence.next()));
	};
});