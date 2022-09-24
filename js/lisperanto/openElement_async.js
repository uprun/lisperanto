// Version hash: 65c421e4d2d1b9f113994e0b93bb7ddc8f39966802bd7ef61685bcbde82a0dcf
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.openElement_async = async function(obj)
{
    await lisperanto.closeElement(obj);
    var wrapper = await lisperanto.create_wrapper_for_canvas_async(obj);
    if( !(wrapper.id() in lisperanto.mapOfOpenElements))
    {
        lisperanto.listOfOpenElements.push(wrapper);
        lisperanto.mapOfOpenElements[wrapper.id()] = wrapper;
    }

    if(typeof(lisperanto.desiredOffset) !== "undefined")
    {
        wrapper.offsetX(lisperanto.desiredOffset.x);
        wrapper.offsetY(lisperanto.desiredOffset.y);
        console.log("set coordinates to desired offset: " + JSON.stringify(lisperanto.desiredOffset));
        lisperanto.desiredOffset = undefined;
    }
    else
    {
        const newLocalX = -lisperanto.globalOffsetX();
        wrapper.offsetX(newLocalX);
        const newLocalY = -lisperanto.globalOffsetY();
        wrapper.offsetY(newLocalY);
        console.log("set coordinates to anchor offsetted:" + JSON.stringify({x: newLocalX, y: newLocalY}  ));
    }
    console.log("finished openElement");
};