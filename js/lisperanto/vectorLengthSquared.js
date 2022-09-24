// Version hash: 89217caa8b741581143f010db363805c0988f0a6cbffeaaa3314fe64eef786fb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLengthSquared = function(point)
{
    return point.x * point.x + point.y * point.y;
};