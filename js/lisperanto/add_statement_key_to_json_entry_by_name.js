// Version hash: d5fd5d4814eecd49c690d1123c46d0680feb588065b0bac012278f8ba31d4eb7
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