// Version hash: 3b13c932f2b03d90a892788fb402e9baca0b9f20a9c5b90961e279ce59ea43dc
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.find_or_create_rdf_predicate_async = async function(predicate)
{
    const predicateNameInLowerCase = predicate.toLowerCase();
    var filtered = ko.utils.arrayFilter(lisperanto.rdf_predicates_Array(), function(item)
        {
            return item["name@lisperanto"].toLowerCase() === predicateNameInLowerCase;
        });
    if(filtered.length === 1)
    {
        return filtered[0].id;
    }
    else
    {
        return await lisperanto.create_RDF_predicate_async(predicate);
    }

};