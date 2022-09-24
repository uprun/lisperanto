// Version hash: ad49e764dd4991be9db9cf9f7e16b4cdd060d34a84e580b3879afa572a0d9884
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.generateVectors = function(point, otherPoints)
{
    var result = [];
    for (const [key, somePoint] of Object.entries(otherPoints)) 
    {
        result.push(lisperanto.createVector(point, somePoint));
    }
    return result;
};