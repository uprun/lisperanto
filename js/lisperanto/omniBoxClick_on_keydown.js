// Version hash: 89d2f428a2df4101ea18aac7df7ba98ca7a695d4baa45d33988af248effe1064
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxClick_on_keydown = function()
{
    event.stopPropagation();
    if(event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
        if(lisperanto.activeOperation() === "global-omni-box-activated")
        {
            lisperanto.create_RDF_entry_with_name_from_omnibox();
        }
    }
    return true;
};