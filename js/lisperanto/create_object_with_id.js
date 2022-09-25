// Version hash: 0ea23d2ce3e806d2ca652e5732a7dbe1f4a1b9a98931ecb71d714acde78ca99d
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_object_with_id = function()
{
    var guid = crypto.randomUUID();
    
    var toAdd = {
        id: guid,
        creation_time: lisperanto.getCurrentDateTimeString()
    };

    lisperanto.customObjects[guid] = toAdd;
    return toAdd;
};