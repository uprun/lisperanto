// Version hash: f6c59fb2e8da851afb7977bdae6dc1d5eeb072151c55e8e210cf78d0db0b7b50
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_to_be_added_key_to_json_async = async function (predicateName, obj) {
    var toAdd_id = await lisperanto.find_or_create_rdf_predicate_async(predicateName);
    var created_copy = await lisperanto.copy_json_and_add_key_and_value_async(obj, "new-key-holder@lisperanto", predicateName);
    var operation = {
        operation: "hold-json-key",
        id_from: await lisperanto.calculate_hash_promise(obj),
        id_to: await lisperanto.calculate_hash_promise(created_copy),
        time: lisperanto.getCurrentDateTimeString()
    };
    await lisperanto.operationsPush_async(operation);
    return created_copy;
};