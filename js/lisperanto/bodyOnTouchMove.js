// Version hash: a81036f79ea4449558ef891a92c7c34d7d7a53f015b75c6714387f5240ed8f54
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