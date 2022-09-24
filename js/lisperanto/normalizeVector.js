// Version hash: a88e01844aea1b7e61952ccdf6d424ded068e2706816102b772fc24e0a307aff
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