// Version hash: 7c73eb65c4d98844f1672a194431b5d987680591efafdc383200415089d57678
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLengthSquared = function(point)
{
    return point.x * point.x + point.y * point.y;
};