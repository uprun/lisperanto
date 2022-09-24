// Version hash: 8324b6f94828992ebdf945bd9d61321e1bfb19df033a6635ec5e6f7c2c735a10
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.find_latest_version = function(key)
{
    if (key in lisperanto.has_new_version_map)
    {
        return lisperanto.find_latest_version(lisperanto.has_new_version_map[key])
    }
    else
    {
        return key;
    }
};