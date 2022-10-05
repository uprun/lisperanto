// Version hash: 850e58eaa38604ed49afdb79bc519002068c2846bf52ebb92d64836bcd66af5d
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
                .done(data_obj => lisperanto.GetOperation_on_done(data_obj));
            }
        }
      });
};