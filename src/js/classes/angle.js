class angle{
	constructor(pointA,pointB,pointC) {
	this.pointA=pointA;
	this.pointB=pointB;
	this.pointC=pointC;
	}
	
	get(){
		const l1_Slope=this.pointA.x==this.pointB.x?"undefined slope":(this.pointA.y-this.pointB.y)/(this.pointA.x-this.pointB.x);
		const  l1_angleRad=(l1_Slope=="undefined slope")?(Math.PI/2):Math.atan(l1_Slope);
		const  l1_angleDeg=l1_angleRad*180/Math.PI;
		
		const l2_Slope=this.pointC.x==this.pointB.x?"undefined slope":(this.pointC.y-this.pointB.y)/(this.pointC.x-this.pointB.x);
		const  l2_angleRad=(l2_Slope=="undefined slope")?(Math.PI/2):Math.atan(l2_Slope);
		const  l2_angleDeg=l2_angleRad*180/Math.PI;

		return {l1:l1_angleDeg,l2:l2_angleDeg,Rad:l2_angleRad-l1_angleRad,Deg:l2_angleDeg-l1_angleDeg}
	}

}