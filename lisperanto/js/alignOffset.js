// Version hash: d747077a9d8a02bb35262b86c1e20fb0c5c390726b3ad0112845dba1545720e2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.alignOffset = function(point)
{
    if(Math.abs(point.x) > Math.abs(point.y) )
    {
        point.y = 0;
    }
    else
    {
        point.x = 0;
    }
    point = lisperanto.normalizeVector(point);
    return point;
};