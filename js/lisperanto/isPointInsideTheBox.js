// Version hash: 23d22e602d46e37a0c67b0a1942bacab1ab12eeecc494d527e072f7a95705bc3
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.isPointInsideTheBox = function(point, box, margin = 0)
{
    var result =
        point.x >= (box.left - margin)
        && point.x <= (box.left + box.width + margin)  
        && point.y >= (box.top - margin)
        && point.y <= (box.top + box.height + margin);
    return result;
};