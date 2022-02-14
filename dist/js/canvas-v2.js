/*! 
 * canvas-v2.js 0.0.1 - 2022-02-10
 * Copyright (c) 2022 omar-sedki; Licensed MIT
 */
 
CanvasRenderingContext2D.prototype.originalRect=CanvasRenderingContext2D.prototype.rect;
CanvasRenderingContext2D.prototype.originalArc=CanvasRenderingContext2D.prototype.arc;
CanvasRenderingContext2D.prototype.originalMoveTo=CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.originalBeginPath=CanvasRenderingContext2D.prototype.beginPath;
CanvasRenderingContext2D.prototype.originalLineTo=CanvasRenderingContext2D.prototype.lineTo;
CanvasRenderingContext2D.prototype.originalClosePath=CanvasRenderingContext2D.prototype.closePath;
CanvasRenderingContext2D.prototype.originalArcTo=CanvasRenderingContext2D.prototype.arcTo;

//------- classes ------------
class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class line{
	constructor(pointA,pointB) {
	this.pointA=pointA;
	this.pointB=pointB;
	}
	
	length(){
		return Math.sqrt(Math.pow(this.pointA.x-this.pointB.x,2)+Math.pow(this.pointA.y-this.pointB.y,2),2)
	}

	getPointOnLineDistanceFrom(point,distance){
		var newPoint={};
		newPoint.x=(this.pointA.x-this.pointB.x)*distance/this.length();
		newPoint.y=(this.pointA.y-this.pointB.y)*distance/this.length();
		if(point=="A"){newPoint.x=-1*newPoint.x+pointA.x;newPoint.y=-1*newPoint.y+pointA.y;}
		if(point=="B"){newPoint.x+=pointB.x;newPoint.y+=pointB.y;}
		return  newPoint;
	}
}


//------- functions ------------

function percentToNumber(_value,_parent){
var percentRegExp=/\s*(\d+(?:\.\d+)?)\s*%\s*/;
if(typeof _value=="string" && percentRegExp.test(_value)){_value=Number(RegExp.$1) * _parent/100}
return _value;	
}
const roundCorner=(ctx,pointA,pointB,pointC)=>
{
    ctx.originalMoveTo(pointA.x,pointA.y);
    ctx.originalLineTo(pointB.x,pointB.y);
    ctx.originalLineTo(pointC.x,pointC.y);
}

//------- prototypes -----------
CanvasRenderingContext2D.prototype.lineTo=function(x,y){
	this.originalLineTo(x,y);
	this._lastPoint={x:x,y:y};

}
CanvasRenderingContext2D.prototype.moveTo=function(x,y){
	this.originalMoveTo(x,y); 
	this._lastPoint={x:x,y:y};  
}
CanvasRenderingContext2D.prototype.square = function(x,y,size,settings)
{
	x=percentToNumber(x,this.canvas.width);
	y=percentToNumber(y,this.canvas.height);
	size=percentToNumber(size,this.canvas.width);

if(arguments.length<4){this.originalRect(x,y,size,size)}
if(arguments.length==4){this.rect(x,y,size,size,settings)}
}
CanvasRenderingContext2D.prototype.rect= function(x,y,width,height,moreSettings)
{
	x=percentToNumber(x,this.canvas.width);
	y=percentToNumber(y,this.canvas.height);
	width=percentToNumber(width,this.canvas.width);
	height=percentToNumber(height,this.canvas.height);
	
	
   if(!(moreSettings)) {this.originalRect(x,y,width,height)}
   else{
       var borderRadius=moreSettings.borderRadius? moreSettings.borderRadius:0;

       var pointA={x:x,y:y}
       var pointB={x:x+width,y:y}
       var pointC={x:x+width,y:y+height}
       var pointD={x:x,y:y+height}
	   
       if (typeof borderRadius =='number')
       {
        pointA.r=borderRadius;
        pointB.r=borderRadius;
        pointC.r=borderRadius;
        pointD.r=borderRadius;
       }
	   
	   if (typeof borderRadius =='object' && borderRadius.length==2)
       {    
        pointA.r=borderRadius[0];
        pointB.r=borderRadius[1];
        pointC.r=borderRadius[0];
        pointD.r=borderRadius[1];
       }
	   
	   if (typeof borderRadius =='object' && borderRadius.length==3)
       {    
        pointA.r=borderRadius[0];
        pointB.r=borderRadius[1];
        pointC.r=borderRadius[2];
        pointD.r=borderRadius[1];
       }
	   
	   

       if (typeof borderRadius =='object' && borderRadius.length==4)
       {    
        pointA.r=borderRadius[0];
        pointB.r=borderRadius[1];
        pointC.r=borderRadius[2];
        pointD.r=borderRadius[3];
       }
	   

      

       var originalLineCap= ctx.lineCap;
       this.lineCap="square";
	   
       this.originalMoveTo(pointA.x+pointA.r,pointA.y);

       this.originalLineTo(pointB.x-pointB.r,pointB.y);
       this.originalArcTo(pointB.x, pointB.y,pointB.x , pointB.y+pointB.r,pointB.r);

       this.originalLineTo(pointC.x,pointC.y-pointC.r);
       this.originalArcTo(pointC.x, pointC.y,pointC.x -pointC.r, pointC.y,pointC.r);

       this.originalLineTo(pointD.x+pointD.r,pointD.y);
       this.originalArcTo(pointD.x, pointD.y,pointD.x, pointD.y-pointD.r,pointD.r);

       this.originalLineTo(pointA.x,pointA.y+pointA.r);
       this.originalArcTo(pointA.x, pointA.y,pointA.x+pointA.r, pointA.y,pointA.r);
	   
       this.lineCap=originalLineCap;

	   }
}
CanvasRenderingContext2D.prototype.circle = function(x,y,radius)
{
	x=percentToNumber(x,this.canvas.width);
	y=percentToNumber(y,this.canvas.height);
	radius=percentToNumber(radius,this.canvas.width);

this.originalArc(x, y,radius, 0, 2 * Math.PI);
}













