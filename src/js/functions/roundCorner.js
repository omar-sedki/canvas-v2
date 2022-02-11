const roundCorner=(ctx,pointA,pointB,pointC)=>
{
    ctx.originalMoveTo(pointA.x,pointA.y);
    ctx.originalLineTo(pointB.x,pointB.y);
    ctx.originalLineTo(pointC.x,pointC.y);
}