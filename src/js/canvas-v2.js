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


//------- functions ------------
@@include('./functions/point.js')
@@include('./functions/line.js')
@@include('./functions/percentToNumber.js')
@@include('./functions/roundCorner.js')

//------- prototypes -----------
@@include('./prototype/lineTo.js')
@@include('./prototype/moveTo.js')
@@include('./prototype/square.js')
@@include('./prototype/rect.js')
@@include('./prototype/circle.js')













