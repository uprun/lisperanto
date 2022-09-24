// Version hash: c37cd6948ca809812c9a68555245f89501ba3826cb6398979ff42771469e18de
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_RDF_entry_with_name_from_omnibox = async function()
{
    const name = lisperanto.omniBoxTextInput().trim();
    if(name.length === 0)
        return;

    await lisperanto.create_and_show_RDF_entry(name);
};