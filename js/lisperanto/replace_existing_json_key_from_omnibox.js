// Version hash: 489773c1b6e7d16c1dd84783200c5e8b3477d9193649f11462527d1934a21a35
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.replace_existing_json_key_from_omnibox = function(obj)
{
    event.stopPropagation();
    const new_key = obj.text;
    lisperanto.replace_focused_json_key_with_new(new_key);
    lisperanto.hideOmniBox();

};