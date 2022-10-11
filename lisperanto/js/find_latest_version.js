// Version hash: d42b3a622b5dc20099e78c2c3176f75657aa764ab689ed127b7f946af6ce0ddf
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