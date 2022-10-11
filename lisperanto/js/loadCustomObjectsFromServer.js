// Version hash: 559d0b3b32ef0af03bd11ac007c181c33bbd18ec11c1b46a549f20ec6ba95774
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.loadCustomObjectsFromServer = function()
{
    $.get('Home/ListOfCustomObjects', function(data, status){
        for(var k in data)
        {
            const hash = data[k];
            console.log(k);
            if( !(hash in lisperanto.customObjects))
            {
                $.get("Home/GetCustomObject", {hash: hash})
                    .done(function(data_obj)
                    {
                        console.log(data_obj)
                        var parsed = JSON.parse(data_obj.value);
                        lisperanto.customObjects[data_obj.hash] = parsed;
                        lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
                    });
            }
        }
      });
};