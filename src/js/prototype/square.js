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