// Version hash: 515ad07457a368e3507cc6a96d3c675ad5a53d372ddeaffc45d4d1010e70e233
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_RDF_Entry = async function(name)
{
    var toAdd = {};
    toAdd["name@lisperanto"] = name;
    return await lisperanto.create_object_with_hash_async(toAdd);
};