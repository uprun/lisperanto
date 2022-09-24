// Version hash: b5cd5bfa5a33deaa0faa16fbd984c7a3be78de2967a5aae20098f347bee006e5
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