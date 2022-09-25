// Version hash: 1ce47bb5176da17966ea6ffc57a88b3af5be4a934bbb11b360e7ec553a8b9f43
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
    const previous_hash = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj, previous_hash);
};