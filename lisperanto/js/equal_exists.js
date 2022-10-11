// Version hash: 7691697726a6bfc9b5a10e934a917e2f850216ba8951aca797d5f06d3d7e7213
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.equal_exists = function(obj)
{
    const objects = Object.entries(lisperanto.customObjects);
    var result = objects.some(function(entry_key)
    {
        const entry = lisperanto.customObjects[entry_key[0]];
        for( var key in obj)
        {
            if (! (key in entry))
            {
                return false;
            }
            if (obj[key] !== entry[key])
            {
                return false;
            }
        }
        return true;
    });
    return result;
};