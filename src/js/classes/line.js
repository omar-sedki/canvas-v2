class line{
	constructor(pointA,pointB) {
	this.pointA=pointA;
	this.pointB=pointB;
	}
	
	length(){
		return Math.sqrt(Math.pow(this.pointA.x-this.pointB.x,2)+Math.pow(this.pointA.y-this.pointB.y,2),2)
	}

	getPointOnLineDistanceFrom(point,distance){
		let newPoint={};
		newPoint.x=(this.pointB.x-this.pointA.x)*distance/this.length();
		newPoint.y=(this.pointB.y-this.pointA.y)*distance/this.length();
		if(point=="A"){newPoint.x=this.pointA.x+newPoint.x;newPoint.y=this.pointA.y+newPoint.y;}
		if(point=="B"){newPoint.x = this.pointB.x -newPoint.x;newPoint.y = this.pointB.y -newPoint.y;}
		return  newPoint;
	}
}