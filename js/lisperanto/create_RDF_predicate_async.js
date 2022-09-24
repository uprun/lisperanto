// Version hash: 25030f3498cb9f7f444f80993291e7b63d342d5f5fc30b155aef5f5ff4a9de9e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_RDF_predicate_async = async function(predicate_name)
{
    var toAdd = {};
    toAdd["name@lisperanto"] = predicate_name;
    toAdd["type"] = "rdf-predicate";

    const created = await lisperanto.create_object_with_hash_async(toAdd);

    lisperanto.rdf_predicates_Array.push(
        {
            id: await lisperanto.calculate_hash_promise(toAdd),
            "name@lisperanto": toAdd["name@lisperanto"]
        }
    );
    return toAdd.id;
};