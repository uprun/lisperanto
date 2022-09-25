// Version hash: 3ca173851dead66b197f3b7e43c4644432d62bb0683c69b26407465003b93f62
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.copy_json_and_replace_key = function(obj, old_key, new_key)
{
    var new_obj = lisperanto.create_object_with_id();
    const available_keys = Object.keys(obj);
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            if(k === old_key)
            {
                new_obj[new_key] = k_value;
            }
            else
            {
                new_obj[k] = k_value;
            }
        }
    });
    new_obj["previous-version@lisperanto"] = obj["id"];
    return new_obj;
};