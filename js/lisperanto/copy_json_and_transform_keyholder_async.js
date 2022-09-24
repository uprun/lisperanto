// Version hash: 9cf490b12a8b4ce470997929ff32f64eee2821d05e55a90f2849b1548cfacd16
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.copy_json_and_transform_keyholder_async = async function(obj, value)
{
    var new_obj = {};
    const available_keys = Object.keys(obj);
    const key = obj["new-key-holder@lisperanto"];
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            new_obj[k] = k_value;
        }
    });
    delete new_obj["new-key-holder@lisperanto"];
    new_obj[key] = value;
    new_obj["previous-version@lisperanto"] = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj);
};