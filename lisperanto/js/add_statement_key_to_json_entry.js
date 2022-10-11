// Version hash: 515eae0f95e2be014bc668e8af709d01abc8831733014e718063c5e2fc3b1bee
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_statement_key_to_json_entry = async function()
{
    const wrapper = lisperanto.focusedObj();
    // [lives-in] [Odesa]
    // I decided that by convention every rdf-entry and rdf-predicate will have a name field 

    var obj = wrapper.wrapped_one();
    const predicateName = lisperanto.omniBoxTextInput().trim();
    if(predicateName === "")
        return;
    var created_copy = await lisperanto.add_to_be_added_key_to_json_async(predicateName, obj);
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.hideOmniBox();
    lisperanto.open_OmniBox_for_adding_text_value_to_json_entry(wrapper);
    return created_copy;
};