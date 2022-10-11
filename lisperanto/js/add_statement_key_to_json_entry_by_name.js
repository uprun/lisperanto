// Version hash: 4024a3b4e6fe6c1574c7345d42345e60aebe9a25b4c54a20769ee3194f8849ef
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_statement_key_to_json_entry_by_name = async function(statement_key)
{
    var obj = lisperanto.focusedObj().wrapped_one();
    var created_copy = await lisperanto.add_to_be_added_key_to_json_async(statement_key, obj);
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.hideOmniBox();
    return created_copy;
};