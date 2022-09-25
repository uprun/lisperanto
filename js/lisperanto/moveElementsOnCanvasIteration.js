// Version hash: decf157b4d107cb317083ed535299cd8bfe503b2b8fbde0c2295e1f2906115fe
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.moveElementsOnCanvasIteration = function()
{
    var elements = lisperanto.listOfOpenElements();
    const anchorWidth = lisperanto.anchorWidth();
    const margin = anchorWidth ;
    for (const [key, wrapper] of Object.entries(elements)) 
    {
        const value = wrapper.wrapped_one();

        var box = lisperanto.getUIBoxOfElement(wrapper, margin);
        if(typeof(box) === "undefined")
        {
            continue;
        }
        
        for (const [innerKey, inner_wrapper] of Object.entries(elements)) 
        {
            const innerValue = inner_wrapper.wrapped_one();
            if(wrapper.id() == inner_wrapper.id())
            {
                continue;
            }
            var boxToAvoid = lisperanto.getUIBoxOfElement(inner_wrapper, margin);
            if(typeof(boxToAvoid) === "undefined")
            {
                continue;
            }
            
            if(lisperanto.doBoxesIntersect(box, boxToAvoid))
            {
                offset = lisperanto.getMinimalOffsetForBox(box, boxToAvoid, 0);
                if(lisperanto.vectorLengthSquared(offset) > 0)
                {
                    offset = lisperanto.normalizeVector(offset);
                    var factor = anchorWidth / 10.0;
                    offset.x *= factor;
                    offset.y *= factor;
                    wrapper.offsetX(wrapper.offsetX() + offset.x);
                    wrapper.offsetY(wrapper.offsetY() + offset.y);
                }
            }
        }
    }

};