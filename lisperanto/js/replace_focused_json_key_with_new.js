// Version hash: 017bf6319295bc4f36226acbcb2d9ad975fd3ca0105d902268adee42c9d6d16e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.replace_focused_json_key_with_new = async function(new_key) {
    const old_key = lisperanto.key_in_json_to_focus;
    const wrapper = lisperanto.focusedObj();
    var copy = lisperanto.copy_json_and_replace_key(wrapper.wrapped_one(), old_key, new_key);
    wrapper.wrapped_one(copy);
    var operation = {
        operation: "replace_json_key",
        id: copy["id"],
        new_key: new_key,
        old_key: old_key,
        'time': lisperanto.getCurrentDateTimeString()
    };
    await lisperanto.operationsPush_async(operation);
};