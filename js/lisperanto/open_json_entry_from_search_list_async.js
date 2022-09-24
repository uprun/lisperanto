// Version hash: f39397ecdb337e7c73fa51657375c3aef6e0f7eabc9a781f56c70dd15ee5bbe7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_json_entry_from_search_list_async = async function(obj)
{
    await lisperanto.openElement_async(lisperanto.customObjects[obj.id]);
    lisperanto.hideOmniBox();
};