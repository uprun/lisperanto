// Version hash: dcb05f012afb05d8031f513fd18999d81190a7c8605ff961289561227755cf55
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