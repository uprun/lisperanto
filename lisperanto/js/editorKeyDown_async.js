// Version hash: eeb9fefc515fe0d22e562944ee2e6addd45a3a597e7748411f2ce70526326dbb
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