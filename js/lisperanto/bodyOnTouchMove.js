// Version hash: 797c14f0775fe607a62b439aa20ba31d3ee91deb50c8fec54c87498883615f9a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnTouchMove = function()
{
    //console.log(event);
    var touches = event.changedTouches;
    if(touches.length > 0 )
    {
        const clientX = touches[0].clientX;
        const clientY = touches[0].clientY;
        if(typeof(lisperanto.previosTouch) !== "undefined")
        {
            var deltaX = lisperanto.previosTouch.x - clientX;
            var deltaY = lisperanto.previosTouch.y - clientY;
            lisperanto.applyMovement(deltaY, deltaX);
        }
        lisperanto.previosTouch = {x: clientX, y: clientY};
    }
};