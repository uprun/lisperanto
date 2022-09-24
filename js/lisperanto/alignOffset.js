// Version hash: 0e404d814766efaa29b538dd62d4b17d0a1313bb4244a00d9cffc168ec7edc2e
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