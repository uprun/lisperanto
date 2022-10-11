// Version hash: a63242229f79da537a06a3bb32ae24a91bd46ab75d228747f7e5d1bff6e739a2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.copy_json_and_add_key_and_value_async = async function(obj, key, value)
{
    var new_obj = {};
    const available_keys = Object.keys(obj);
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            new_obj[k] = k_value;
        }
    });
    new_obj[key] = value;
    const previous_hash = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj, previous_hash);
};