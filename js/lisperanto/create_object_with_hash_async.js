// Version hash: 112f3f8f3ca6eae3cf2a2f5c49b4b12a19a542715bc4e993cee9e9bba64a06a6
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_object_with_hash_async = async function(original_object)
{
    const hash = await lisperanto.calculate_hash_promise(original_object);
    if ( !(hash in lisperanto.customObjects))
    {
        lisperanto.customObjects[hash] = original_object;
        var operation = 
        {
            operation: "create-initial-version",
            id_to: hash,
            'initial-data': lisperanto.clone(original_object),
            'time': lisperanto.getCurrentDateTimeString()
        };
        await lisperanto.operationsPush_async(operation);
    }
    return original_object;
};