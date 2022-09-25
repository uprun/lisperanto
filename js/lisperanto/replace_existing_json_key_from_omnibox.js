// Version hash: 801f75b503858a1f44a4e71d0de466eae0362a9d6c5be275b70472469bd9212a
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