// Version hash: d19077d176252dcd3a02fe420792f6b5cdb422411a2727192ba2b818d65bb1f2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_json_entry_from_object = function(obj)
{
    var new_obj = lisperanto.create_object_with_id();
    for(var k in obj)
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            if(typeof(k_value) !== "function")
            {
                new_obj[k] = k_value;
            }
        }
    }
    return new_obj;
};