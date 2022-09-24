// Version hash: 14c86dbb6e63c100d97d383c9a04a5954ecc6d518aac6bb468c5e0574e812de2
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