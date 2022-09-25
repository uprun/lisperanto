// Version hash: fb5872f0afa4b725018da7af7a9a214c3ee0e53020227cae910ca8a6e7540b32
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