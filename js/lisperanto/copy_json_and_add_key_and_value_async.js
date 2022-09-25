// Version hash: 33c42aa0493766626f387cb2616955779618b33d35a1128e0b8c43bc319e151e
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
    new_obj["previous-version@lisperanto"] = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj);
};