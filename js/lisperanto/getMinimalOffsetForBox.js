// Version hash: cac39f54ef35b0aec8ecb64128fb8105aecfb44c2aa6ea7792debb6b1a31b1a8
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.getMinimalOffsetForBox = function(firstBox, secondBox, margin)
{
    var offsets = []; 
    var firstBoxCorners = lisperanto.generateCornersOfTheBox(firstBox);
    for (const [key, pointF] of Object.entries(firstBoxCorners)) 
    {
        if(lisperanto.isPointInsideTheBox(pointF, secondBox, margin=2))
        {
            var escapesFromSecondBox = lisperanto.getVectorsFromBox(pointF, secondBox, margin=2);
            var firstBoxVectors = lisperanto.getVectorsFromBox(pointF, firstBox, margin=0);
            for (const [key, escapeV] of Object.entries(escapesFromSecondBox)) 
            {
                for (const [key, firstV] of Object.entries(firstBoxVectors)) 
                {
                    if(lisperanto.vectorLengthSquared(firstV) > 0.1)
                    {
                        if(lisperanto.vectorsAreCoAligned(escapeV, firstV))
                        {
                            offsets.push(escapeV);
                        }
                    }
                }
            }
        }
    }
    if(offsets.length == 0)
    {
        return {x: 0, y: 0};
    }
    else
    {
        var minimalOffset = offsets[0];
        for (const [key, o] of Object.entries(offsets)) 
        {
            if(lisperanto.vectorLengthSquared(o) < lisperanto.vectorLengthSquared(minimalOffset))
            {
                minimalOffset = o;
            }
        }
        return minimalOffset;
    }
};