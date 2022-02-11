CanvasRenderingContext2D.prototype.square = function(x,y,size,settings)
{
	x=percentToNumber(x,this.canvas.width);
	y=percentToNumber(y,this.canvas.height);
	size=percentToNumber(size,this.canvas.width);

if(arguments.length<4){this.originalRect(x,y,size,size)}
if(arguments.length==4){this.rect(x,y,size,size,settings)}
}