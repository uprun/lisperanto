// Version hash: ce9d46638f13b3b85447100b56a010b1b9d0f94cfcda0e65977f5f4c507f1bf2
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