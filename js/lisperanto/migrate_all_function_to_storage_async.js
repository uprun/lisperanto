// Version hash: 7c3982ea24600fe7ad1df7a4688fe7352b45ef4e14ef28502cc68760231b5440
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.migrate_all_function_to_storage_async = async function()
{
    for(var key_name in lisperanto)
    {
        if (key_name == "customObjects")
        {
            // ignore customObjects
            continue;
        }
        const rdf_entry_name = key_name;
        const entry_in_lisperanto = lisperanto[key_name];
        const type_of_entry = typeof(entry_in_lisperanto);
        var expected_object = {};
        expected_object["name@lisperanto"] = rdf_entry_name;
        expected_object["type@lisperanto"] = type_of_entry;
        expected_object["module@lisperanto"] = "lisperanto";

        if(type_of_entry === "function")
        {
            const function_definition = entry_in_lisperanto.toString();
            if(function_definition.toLowerCase().indexOf("[object") == 0 )
            {
                continue;
            }
            expected_object["programming-language@lisperanto"] = "javascript";

            expected_object["javascript-function-definition@lisperanto"] = function_definition;
            const present = await lisperanto.equal_exists_async(expected_object);

            if (!present)
            {
                await lisperanto.create_object_with_hash_async(expected_object);
                console.log("creating json entry for", expected_object);
            }
        }
        else
        {
            console.log("Non function found")
            console.log(key_name);
        }
    }
};