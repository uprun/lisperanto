// Version hash: c2365a9ec611fa2d59aff24fe619eba1a857427a7aa5482eefca3800fca16e5b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.load_operations_from_server = function()

{



    if ( !("lookup_by_name" in lisperanto))
    {
        lisperanto["lookup_by_name"] = {};

    }


    if ( !("operations" in lisperanto))
    {
        lisperanto["operations"] = {};

    }

    $.get('Home/ListOfOperations', function(data, status){
        for(var k in data)
        {
            const key = data[k];
            console.log(k);
            if( !(key in lisperanto.operations))
            {
                $.get("Home/GetOperation", {key: key})
                    .done(function(data_obj)
                    {
                        console.log(data_obj)
                        var parsed = JSON.parse(data_obj.value);



                        lisperanto.operations[data_obj.key] = parsed;

                        if (("id_from" in parsed) && ("id_to" in parsed))

                        {
                            const id_from = parsed["id_from"];
                            const id_to = parsed["id_to"];
                            lisperanto.has_new_version_map[id_from] = id_to;
                        }

                        else
                        {
                            if (("id_to" in parsed))
                            {
                                const id_to = parsed["id_to"];
                                const obj = lisperanto.customObjects[id_to];
                                if (("name@lisperanto" in obj))
                                {
                                    const name = obj["name@lisperanto"];
                                    if (name in lisperanto["lookup_by_name"])
                                    {
                                        const latest_key = lisperanto["lookup_by_name"][name];
                                        if(data_obj.key > latest_key )
                                        {
                                            lisperanto["lookup_by_name"][name] = data_obj.key;
                                        }
                                    }
                                    else
                                    {
                                        lisperanto["lookup_by_name"][name] = data_obj.key;
                                    }
                                }


                            }
                        }

                        //lisperanto.customObjects[data_obj.hash] = parsed;
                        lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
                    });
            }
        }
      });
};