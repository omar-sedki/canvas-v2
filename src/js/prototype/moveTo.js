CanvasRenderingContext2D.prototype.moveTo=function(x,y){
	this.originalMoveTo(x,y); 
	this._lastPoint={x:x,y:y};  
}