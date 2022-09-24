// Version hash: 356c0a06cec9de80b3c7ab39128d1227ec04daf6d47754c01e8e5f2cf5045cc7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.createVector = function(a, b)
{
    var result = {
        x: b.x - a.x,
        y: b.y - a.y
    };
    return result;
};