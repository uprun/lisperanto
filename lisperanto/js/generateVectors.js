// Version hash: 4c2b7218469b25ae97828e35b444830bf78b34741919db1eda64ea8ad9855458
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