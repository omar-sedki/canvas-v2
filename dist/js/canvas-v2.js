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
class shape2D {
  constructor(points,options) {
    this.points = points;
    this.options = options;
    
    }

  borderRadius(ArrayIndex) {

    let _borderRadius = this.options && this.options.borderRadius ? this.options.borderRadius : 0;
    if (typeof _borderRadius == "number") { return _borderRadius }
    else if (typeof _borderRadius == 'object' && _borderRadius.length == this.points.length) { return _borderRadius[ArrayIndex] }
    else{return 0}
  }

  createPath(ctx) {  


      ctx.beginPath();
      

    for (let i = 0; i < this.points.length; i++){
      let _previndex = i == 0 ? this.points.length - 1 : i - 1;
      let _nextindex = (i == this.points.length - 1) ? 0 : i + 1;
      let _nextNextindex = (i == this.points.length - 1 || i == this.points.length - 2) ? i-this.points.length+2 : i + 2
      let _prevPrevindex = (i == 0 || i == 1) ? (i + this.points.length - 2) : i -2;
  
      let _currentLine=new line(
        { x: this.points[i].x, y: this.points[i].y },
        { x: this.points[_nextindex].x, y: this.points[_nextindex].y }
      );

      let _prevLine=new line(
        { x: this.points[i].x, y: this.points[i].y },
        { x: this.points[_previndex].x, y: this.points[_previndex].y }
      );

      let _angle = new angle(this.points[_previndex], this.points[i], this.points[_nextindex]).rad;
      let _angleNext = new angle( this.points[i], this.points[_nextindex],this.points[_nextNextindex]).rad;
      let _anglePrev = new angle(this.points[_prevPrevindex] ,this.points[_previndex], this.points[i]).rad;

      let _radius=this.borderRadius(i);
      let _realRadius = this.borderRadius(i) / Math.tan(_angle/2);
      let _nextRealRadius = this.borderRadius(_nextindex) / Math.tan(_angleNext/2);
      let _prevRealRadius = this.borderRadius(_previndex) / Math.tan(_anglePrev/2);

// border radius bigger than length
const BR_Percent={
  nextPoint:_nextRealRadius/_currentLine.length(),
  prevPoint: _prevRealRadius/_prevLine.length(),
  point:_realRadius/_currentLine.length(),
  pointInPrevLine:_realRadius/_prevLine.length(),

  line:(_nextRealRadius+_realRadius)/_currentLine.length(),
  prevLine: (_prevRealRadius+_realRadius)/_prevLine.length(),
};

if(BR_Percent.line>1 || BR_Percent.prevLine>1){
  let newRadius;
 if(BR_Percent.line>1){newRadius= _realRadius/BR_Percent.line}
 if(BR_Percent.prevLine> BR_Percent.line){newRadius= _realRadius/BR_Percent.prevLine}
 console.log(BR_Percent);
 console.log("before"+ _realRadius);
 _realRadius=newRadius;

 console.log("after"+ _realRadius);
}
  

      let _startArcPoint =  _prevLine.getPointOnLineDistanceFrom("A",  _realRadius);
      let _endArcPoint = _currentLine.getPointOnLineDistanceFrom("A",  _realRadius);
      let _endLinePoint = _currentLine.getPointOnLineDistanceFrom("B", _nextRealRadius);

      if (i == 0) {
        ctx.originalMoveTo(_startArcPoint.x, _startArcPoint.y);
      }
 

      
     
      ctx.originalArcTo(this.points[i].x,this.points[i].y, _endArcPoint.x, _endArcPoint.y,_radius );
      ctx.originalLineTo(_endLinePoint.x, _endLinePoint.y);

    }


        ctx.closePath();

    }

}



	
 
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
		let newPoint={};
		newPoint.x=(this.pointB.x-this.pointA.x)*distance/this.length();
		newPoint.y=(this.pointB.y-this.pointA.y)*distance/this.length();
		if(point=="A"){newPoint.x=this.pointA.x+newPoint.x;newPoint.y=this.pointA.y+newPoint.y;}
		if(point=="B"){newPoint.x = this.pointB.x -newPoint.x;newPoint.y = this.pointB.y -newPoint.y;}
		return  newPoint;
	}
}
class angle {
  constructor(pointA, pointB, pointC) {
    this.pointA = pointA;
    this.pointB = pointB;
	this.pointC = pointC;
	this.calculate();
  }

  calculate() {
    const dAx = this.pointA.x - this.pointB.x;
    const dAy = this.pointA.y - this.pointB.y;
    const dBx = this.pointC.x - this.pointB.x;
    const dBy = this.pointC.y - this.pointB.y;
    let angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    if(angle < 0) {angle = angle * -1;}
    this.rad=angle;
    this.degree = angle * 180 / Math.PI;
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
CanvasRenderingContext2D.prototype.square = function (x, y, size, options) {
x = percentToNumber(x, this.canvas.width);
y = percentToNumber(y, this.canvas.height);
size = percentToNumber(size, this.canvas.width);

const points = [];
	points.push({ x: x, y: y });
	points.push({ x: x + size, y: y });
	points.push({ x: x + size, y: y + size });
	points.push({ x: x, y: y + size });

  const square = new shape2D(points, options);
  square.createPath(this);
}
CanvasRenderingContext2D.prototype.triangle = function(pointA,pointB,pointC,options)
{
	triangle = new shape2D([pointA, pointB, pointC],options);
	triangle.createPath(this);
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













