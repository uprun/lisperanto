// Version hash: 7480f9ed8011de722b6674e539afd3ef6609a388f00777b53534ac751dacb560
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_existing_RDF_predicate_to_json_from_omnibox = async function(obj)
{
    event.stopPropagation();
    await lisperanto.add_statement_key_to_json_entry_by_name(obj.text);
    lisperanto.hideOmniBox();
};