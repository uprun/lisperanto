// Version hash: 2f05247ed6543ad32dda6845a3bbca971613deb3c7f7a4f1afe320cbc2b659fd
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.normalizeVector = function(point)
{
    var newLength = Math.sqrt(lisperanto.vectorLengthSquared(point));
    point.x /= newLength;
    point.y /= newLength;
    return point;
};