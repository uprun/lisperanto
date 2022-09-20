if(typeof(lisperanto) === 'undefined')
{
    lisperanto = {};
}
lisperanto.define_globalOffsetX = () => lisperanto.globalOffsetX = ko.observable(0.0);
lisperanto.define_globalOffsetY = () => lisperanto.globalOffsetY = ko.observable(0.0);
lisperanto.define_globalOffsetZ = () => lisperanto.globalOffsetZ = ko.observable(1.0);
lisperanto.define_globalMaxX = () => lisperanto.globalMaxX = ko.observable(screen.width);
lisperanto.define_globalMaxY = () => lisperanto.globalMaxY = ko.observable(screen.height);
lisperanto.define_globalMinX = () => lisperanto.globalMinX = ko.observable(-screen.width * 2);
lisperanto.define_globalMinY = () => lisperanto.globalMinY = ko.observable(-screen.height * 2);

lisperanto.bodyOnWheel = function() {
    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lisperanto.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;
};

lisperanto.bodyOnPointerMove = function()
{
    //console.log(event);

};

lisperanto.applyMovement = function (deltaY, deltaX) 
{
    var newOffsetY = lisperanto.globalOffsetY() - deltaY * lisperanto.globalOffsetZ();
    const max_Y = lisperanto.globalMaxY();
    newOffsetY = Math.min(newOffsetY, max_Y);
    const min_Y = lisperanto.globalMinY() + document.body.offsetHeight;
    newOffsetY = Math.max(newOffsetY, min_Y);
    lisperanto.globalOffsetY(newOffsetY);

    var newOffsetX = lisperanto.globalOffsetX() - deltaX * lisperanto.globalOffsetZ();
    const max_X = lisperanto.globalMaxX();
    newOffsetX = Math.min(newOffsetX, max_X);
    const min_X = lisperanto.globalMinX() + document.body.offsetWidth;
    newOffsetX = Math.max(newOffsetX, min_X);
    lisperanto.globalOffsetX(newOffsetX);
    //console.log({x: newOffsetX, min_X: min_X, y: newOffsetY, min_Y: min_Y});
};

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

lisperanto.bodyOnTouchEnd = function()
{
    lisperanto.previosTouch = undefined;
};