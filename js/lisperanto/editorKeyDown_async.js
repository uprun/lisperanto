// Version hash: 5368f532e6a2baa5481434e7e9c41d738b3abcb09bf5d07d4cf1797fd5e3b99c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.editorKeyDown_async = async function()
{
    event.stopPropagation();
    if (event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
        const id = event.target.offsetParent.id;
        const parent = lisperanto.mapOfOpenElements[id];
        await lisperanto.confirm_change_to_json_async(parent);
    }
    //console.log(event);
    return true;
};