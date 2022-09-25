// Version hash: 2b24fd7a1d1068cfc89301b32101c7897e3f66e0fa1252787758628635f8a134
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_object_with_hash_async = async function(original_object, previous_hash)
{
    const hash = await lisperanto.calculate_hash_promise(original_object);
    if ( !(hash in lisperanto.customObjects))
    {
        lisperanto.customObjects[hash] = original_object;
        var operation = 
        {

            operation: "create-initial-version-time-only",
            id_to: hash,
            'time': lisperanto.getCurrentDateTimeString()
        };

        if (typeof(previous_hash) !== 'undefined')
        {
            operation["id_from"] = previous_hash;

        }

        await lisperanto.operationsPush_async(operation);
    }
    return original_object;
};