CanvasRenderingContext2D.prototype.triangle = function(pointA,pointB,pointC)
{
	this.beginPath();
	this.moveTo(pointA.x, pointA.y);
	this.lineTo(pointB.x,pointB.y);
	this.lineTo(pointC.x,pointC.y);
	this.closePath();
}