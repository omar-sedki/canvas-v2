function line(pointA,pointB)
{
	this.pointA=pointA;
	this.pointB=pointB;
	
	this.length=function()
	{
		return Math.sqrt(Math.pow(this.pointA.x-this.pointB.x,2)+Math.pow(this.pointA.y-this.pointB.y,2),2)
	}

	this.getPointOnLineDistanceFrom=function(point,distance)
	{
		var newPoint={};
		newPoint.x=(this.pointA.x-this.pointB.x)*distance/this.length();
		newPoint.y=(this.pointA.y-this.pointB.y)*distance/this.length();
		if(point=="A"){newPoint.x=-1*newPoint.x+pointA.x;newPoint.y=-1*newPoint.y+pointA.y;}
		if(point=="B"){newPoint.x+=pointB.x;newPoint.y+=pointB.y;}
		return  newPoint;
	}
}