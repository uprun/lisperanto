// Version hash: 3652d0bbf887ad0ffa5d0625e239dbf1a12aefc17f30616e41717e2f1c702429
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.epsilonEqual = function(a, b, e = 0.00001 )
{
    var result = Math.abs(a-b) < e;
    return result;
};