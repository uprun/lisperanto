// Version hash: 1f64e3733eb166b989315256563f8d7fbc267f0ad8615e890d9ab3bfaf7b884b
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