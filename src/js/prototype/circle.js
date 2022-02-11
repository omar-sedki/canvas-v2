CanvasRenderingContext2D.prototype.circle = function(x,y,radius)
{
	x=percentToNumber(x,this.canvas.width);
	y=percentToNumber(y,this.canvas.height);
	radius=percentToNumber(radius,this.canvas.width);

this.originalArc(x, y,radius, 0, 2 * Math.PI);
}