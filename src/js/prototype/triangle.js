CanvasRenderingContext2D.prototype.triangle = function(pointA,pointB,pointC,options)
{
	triangle = new shape2D([pointA, pointB, pointC],options);
	triangle.createPath(this);
}