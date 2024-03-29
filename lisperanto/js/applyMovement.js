﻿// Version hash: 8b5fb6b9b059714a7562219300e38476e2a389a8efaaa3fce1336907c42d76b4
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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