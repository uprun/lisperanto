// Version hash: 1bd783bda0c263720adc67afb979695418002f7a3af76648fc3a09d86fd5e9f5
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