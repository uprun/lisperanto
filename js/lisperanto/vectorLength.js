// Version hash: d3136524874923759b8d261d3840869a52c02a111ebe6c1af055948bd08ac468
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLength = function(v)
{
    var result = Math.sqrt(lisperanto.vectorLengthSquared(v));
    return result;
};