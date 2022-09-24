// Version hash: faa079ae8fa92ee1b59e5f35ac4d03692d5e67f0ee6e704f54da3562079ba3c3
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