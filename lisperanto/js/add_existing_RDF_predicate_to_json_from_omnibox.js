// Version hash: bfc4528eac8d9a3975d87dfc80ff6527c97e63349bbe6af4b9086d51f2d3919e
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