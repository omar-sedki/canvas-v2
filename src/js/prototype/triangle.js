CanvasRenderingContext2D.prototype.triangle = function(pointA,pointB,pointC)
{
	triangle = new shape2D([pointA, pointB, pointC]);
	triangle.createPath(this);
}