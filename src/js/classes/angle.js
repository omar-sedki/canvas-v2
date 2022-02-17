class angle {
  constructor(pointA, pointB, pointC) {
    this.pointA = pointA;
    this.pointB = pointB;
	this.pointC = pointC;
	this.calculate();
  }

  calculate() {
    const l1_Slope =
      this.pointA.x == this.pointB.x
        ? "undefined slope"
        : (this.pointA.y - this.pointB.y) / (this.pointA.x - this.pointB.x);
    let l1_angleRad =
      l1_Slope == "undefined slope" ? Math.PI / 2 : Math.atan(l1_Slope);
    if (l1_angleRad < 0) {
      l1_angleRad = 2 * Math.PI + l1_angleRad;
    } //negative angle add 2Pi
    let l1_angleDeg = (l1_angleRad * 180) / Math.PI;

    const l2_Slope =
      this.pointC.x == this.pointB.x
        ? "undefined slope"
        : (this.pointC.y - this.pointB.y) / (this.pointC.x - this.pointB.x);
    let l2_angleRad =
      l2_Slope == "undefined slope" ? Math.PI / 2 : Math.atan(l2_Slope);
    if (l2_angleRad < 0) {
      l2_angleRad = 2 * Math.PI + l2_angleRad;
    }
    let l2_angleDeg = (l2_angleRad * 180) / Math.PI;

	const angleDiff = l1_angleRad - l2_angleRad;
	  
	  this.rad = Math.abs(angleDiff);
	  this.rad = this.rad < Math.PI ? this.rad : (2 * Math.PI)-this.rad;
	  this.degree = (this.rad * 180) / Math.PI;


  }
}
