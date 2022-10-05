// Version hash: dd2c1c7d37b27b7ee768b195e2a11854c33a1345856c13bf974ae4e87cc7034c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.GetOperation_on_done = function(data_obj)
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
};