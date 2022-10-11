// Version hash: 3cb55c382ae008db3e489b21726565d094d00e20839c04d1ddc119a1620cd91b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.delete_json_key = function()
{
    var copy = lisperanto.create_plain_json_copy(lisperanto.focusedObj().wrapped_one());
    delete copy[lisperanto.key_in_json_to_focus];
    lisperanto.focusedObj().wrapped_one(copy);
    var operation = {
        operation: "delete_json_key",
        id: copy["id"],
        remove_key: lisperanto.key_in_json_to_focus,
        'time': lisperanto.getCurrentDateTimeString()
    };
    lisperanto.operationsPush(operation);
    lisperanto.hideOmniBox();
};