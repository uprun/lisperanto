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

};

lookup.applyMovement = function (deltaY, deltaX) 
{
    var newOffsetY = lookup.globalOffsetY() - deltaY * lookup.globalOffsetZ();
    const max_Y = lookup.globalMaxY();
    newOffsetY = Math.min(newOffsetY, max_Y);
    const min_Y = lookup.globalMinY() + document.body.offsetHeight;
    newOffsetY = Math.max(newOffsetY, min_Y);
    lookup.globalOffsetY(newOffsetY);

    var newOffsetX = lookup.globalOffsetX() - deltaX * lookup.globalOffsetZ();
    const max_X = lookup.globalMaxX();
    newOffsetX = Math.min(newOffsetX, max_X);
    const min_X = lookup.globalMinX() + document.body.offsetWidth;
    newOffsetX = Math.max(newOffsetX, min_X);
    lookup.globalOffsetX(newOffsetX);
    console.log({x: newOffsetX, min_X: min_X, y: newOffsetY, min_Y: min_Y});
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