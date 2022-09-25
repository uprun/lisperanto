// Version hash: 1339a84999d5af4f9f21cbcdb81425c844d34bd823d262e53d072b93f8f7f85f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_plain_json_copy = function(obj)
{
    var new_obj = lisperanto.create_object_with_id();
    const available_keys = Object.keys(obj);
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            new_obj[k] = k_value;
        }
    });
    new_obj["previous-version@lisperanto"] = obj["id"];
    return new_obj;
};