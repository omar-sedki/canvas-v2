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