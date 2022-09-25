// Version hash: 39054453aa68674a568799a3cbbe9fe200098d3f9da86762462796a9beeec8db
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.epsilonEqual = function(a, b, e = 0.00001 )
{
    var result = Math.abs(a-b) < e;
    return result;
};