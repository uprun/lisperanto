// Version hash: fd892b7748b2a451254c4eaeb71aaf862d5e36eee5fccdf88e431bee6364792f
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