$(function () {
	
	var loadImageDatas = function (components) {
		var imageDatas = [];
		for (var i = 0; i < components.length; i++) {
			imageDatas.push(components[i].getContext("2d").getImageData(0, 0, components[i].width, components[i].height));
		}
		return imageDatas;
	};
	
	var addPixelValues = function (componentDatas, offset) {
		var sum = 0;
		for (var i = 0; i < componentDatas.length; i++) {
			sum += componentDatas[i].data[offset];
		}
		return sum;
	};
	
	var summerDefaults = {
		components: []
	};
	
	interference.CanvasSummer = function (options) {
		
		var settings = $.extend({}, summerDefaults, options);
		
		this.components = settings.components;
		this._output = settings.output;
	};

	interference.CanvasSummer.prototype.update = function () {
		var imageDatas = loadImageDatas(this.components);
		var outputImageData = this._output.getContext("2d").getImageData(0, 0, this._output.width, this._output.height);
		for (var i = 0; i < outputImageData.data.length; i += 1) {
			outputImageData.data[i] = addPixelValues(imageDatas, i);
		}
		this._output.getContext("2d").putImageData(outputImageData, 0, 0);
	};
});