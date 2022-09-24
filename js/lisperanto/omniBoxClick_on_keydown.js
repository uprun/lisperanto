// Version hash: 3e2dc3188e682fd8bf8935f27c44e62483a5b6dc3e55354b686703865b713dae
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