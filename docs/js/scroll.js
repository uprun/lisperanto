if(typeof(lookup) === 'undefined')
{
    lookup = {};
}
lookup.globalOffsetX = ko.observable(0.0);
lookup.globalOffsetY = ko.observable(0.0);
lookup.globalOffsetZ = ko.observable(1.0);
lookup.globalMaxX = ko.observable(2048);
lookup.globalMaxY = ko.observable(2048);
lookup.globalMinX = ko.observable(-2048);
lookup.globalMinY = ko.observable(-2048);

lookup.bodyOnWheel = function() {
    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lookup.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;
};

lookup.bodyOnPointerMove = function()
{
    //console.log(event);
    if(event.shiftKey)
    {
        lookup.applyMovement(-event.movementY, -event.movementX);
    }

};

lookup.applyMovement = function (deltaY, deltaX) 
{
    var newOffsetY = lookup.globalOffsetY() - deltaY * lookup.globalOffsetZ();
    newOffsetY = Math.min(newOffsetY, lookup.globalMaxY());
    newOffsetY = Math.max(newOffsetY, lookup.globalMinY());
    lookup.globalOffsetY(newOffsetY);

    var newOffsetX = lookup.globalOffsetX() - deltaX * lookup.globalOffsetZ();
    newOffsetX = Math.min(newOffsetX, lookup.globalMaxX());
    newOffsetX = Math.max(newOffsetX, lookup.globalMinX());
    lookup.globalOffsetX(newOffsetX);
};

lookup.previosTouch = undefined;

lookup.bodyOnTouchMove = function()
{
    //console.log(event);
    var touches = event.changedTouches;
    if(touches.length > 0 )
    {
        const clientX = touches[0].clientX;
        const clientY = touches[0].clientY;
        if(typeof(lookup.previosTouch) !== "undefined")
        {
            var deltaX = lookup.previosTouch.x - clientX;
            var deltaY = lookup.previosTouch.y - clientY;
            lookup.applyMovement(deltaY, deltaX);
        }
        lookup.previosTouch = {x: clientX, y: clientY};
    }
};

lookup.bodyOnTouchEnd = function()
{
    lookup.previosTouch = undefined;
};