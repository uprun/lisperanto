// Version hash: 04319320d442c03938f99a04bd2d5902bd35d55f84c524d4c641f35a6f497914
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