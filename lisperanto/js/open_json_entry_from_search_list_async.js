// Version hash: 048342f80cb7bfa18fbc661847be6a40a38eff3c0c29f08897d1fd46e7aa6e93
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_json_entry_from_search_list_async = async function(obj)
{
    await lisperanto.openElement_async(lisperanto.customObjects[obj.id]);
    lisperanto.hideOmniBox();
};