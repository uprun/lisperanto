// Version hash: c3e4438faa2f3b96c8b49e3adeda80a548b54306c9f92777b87403fa44f29ee0
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_text_value_to_json_entry_async = async function()
{
    const wrapper = lisperanto.focusedObj();
    var obj = wrapper.wrapped_one();
    const text_value = lisperanto.omniBoxTextInput().trim();
    var created_copy = await lisperanto.copy_json_and_transform_keyholder_async(obj, text_value);
    
    var operation = {
        id_from: await lisperanto.calculate_hash_promise(obj),
        id_to: await lisperanto.calculate_hash_promise(created_copy),
        operation: "set-value-to-holded-key",
        value: text_value,
        time: lisperanto.getCurrentDateTimeString()
    };
    wrapper.wrapped_one(created_copy);
    await lisperanto.operationsPush_async(operation);
    lisperanto.hideOmniBox();
    await lisperanto.open_OmniBox_for_adding_statement_to_json_entry_async(wrapper);
};