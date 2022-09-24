// Version hash: 104df536dc42bf7d3871cfc113c23c5131ec9aa38a2245af289e2b0e9433ae03
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_and_show_RDF_entry = async function(name)
{
    var toShow = await lisperanto.create_RDF_Entry(name);
    await lisperanto.openElement_async(toShow);
    lisperanto.hideOmniBox();
};