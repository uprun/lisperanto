// Version hash: 9ce03d9c254f5fae87dda82497ba375a777de992182c00d8ad0d1ca0dd976a0a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.replace_existing_json_key_from_omnibox_text_async = async function()
{
    const new_key = lisperanto.omniBoxTextInput().trim();
    var new_key_id = await lisperanto.find_or_create_rdf_predicate_async(new_key);
    lisperanto.replace_focused_json_key_with_new(new_key);
    lisperanto.hideOmniBox();
};