// Version hash: 55d7f24e8c40c37fa699ce4da142c82cfe790fc65c6f09d8356c398c840c5a1a
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