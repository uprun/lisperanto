// Version hash: 681a3ae60368e96cd8e5e5c905459c5f81635c209f63641be4edaeba3789df69
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