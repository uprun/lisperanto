// Version hash: e10ebe99bb30d15ec53d09e0685bff65ef0c8933d6e0b6345df755f0de3c1e61
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorsAreCoAligned = function(bv, obv)
{
    var dp = lisperanto.vectorsDotProduct(bv, obv);
    var cosAlpha = dp / (lisperanto.vectorLength(bv) * lisperanto.vectorLength(obv));
    var result = lisperanto.epsilonEqual(cosAlpha, 1.0);
    return result;
};