// Version hash: 10470d59c02c49142df6f906906d814183dee1a36d5c01e4d51c0a72f174694d
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