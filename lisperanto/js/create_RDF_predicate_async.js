// Version hash: 80860d1992c6f789989abffc3c530a3a3e32bdec4879faf36b52a00710b468d2
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