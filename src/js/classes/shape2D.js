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



	
 