CanvasRenderingContext2D.prototype.lineTo=function(x,y){
	this.originalLineTo(x,y);
	this._lastPoint={x:x,y:y};

}