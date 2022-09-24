// Version hash: 2a0cb52ccd2e9ea444310f4927a89acc1c6db0ad451b74b1a53adec14067cb83
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