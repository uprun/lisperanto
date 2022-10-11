// Version hash: 9055a4ce3b6963833062b2eaab83a0323990a6d15124e965493591b64a01c814
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxInputKeyPress_async = async function() 
{
    if(event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
    }
    else
    {
        if(event.keyCode == 13)
        {
            const key = lisperanto.activeOperation();
            var map = 
            {
                "add-statement-key-to-json-entry": () => lisperanto.add_statement_key_to_json_entry(),
                'add-text-value-to-json-entry':async () => await lisperanto.add_text_value_to_json_entry_async(),
                'replace-existing-json-key': async () => await lisperanto.replace_existing_json_key_from_omnibox_text_async()
            };

            if ( key in map)
            {
                map[key]();
            }
            else if(lisperanto.activeOperation() === "global-omni-box-activated")
            {
                const availableEntries = lisperanto.filteredSearch();
                var searchQuery = lisperanto.omniBoxTextInput().trim().toLowerCase();
                const exactMatch = availableEntries.filter(entry => entry.text === searchQuery);
                if(exactMatch.length === 1)
                {
                    var functionToOpen = lisperanto.customObjects[exactMatch[0].id];
                    await lisperanto.openElement_async(functionToOpen);
                    lisperanto.hideOmniBox();
                }
            }
        }
        else
        {
            //console.log(event.keyCode);
        }
    }
    return true;
};