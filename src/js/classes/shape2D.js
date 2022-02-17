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

      let _startArcPoint = new line(
        { x: this.points[i].x, y: this.points[i].y },
        { x: this.points[_previndex].x, y: this.points[_previndex].y }
      ).getPointOnLineDistanceFrom("A", this.borderRadius(i));

      let _endArcPoint = new line(
        { x: this.points[i].x, y: this.points[i].y },
        { x: this.points[_nextindex].x, y: this.points[_nextindex].y }
      ).getPointOnLineDistanceFrom("A", this.borderRadius(i));

      let _endLinePoint = new line(
        { x: this.points[i].x, y: this.points[i].y },
        { x: this.points[_nextindex].x, y: this.points[_nextindex].y }
      ).getPointOnLineDistanceFrom("B", this.borderRadius(_nextindex));

      if (i == 0) {
        ctx.originalMoveTo(_startArcPoint.x, _startArcPoint.y);
      }
 
      ctx.originalArcTo(this.points[i].x,this.points[i].y, _endArcPoint.x, _endArcPoint.y, this.borderRadius(i));
      ctx.originalLineTo(_endLinePoint.x, _endLinePoint.y);

    }


        ctx.closePath();

    }

}



	
 