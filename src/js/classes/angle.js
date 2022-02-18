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
