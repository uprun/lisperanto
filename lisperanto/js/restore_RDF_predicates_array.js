// Version hash: e5129be716af50a63ae33ce05dbd1ce50541aea8e6674ee993f45606ac0d6288
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.restore_RDF_predicates_array = function()
{
    for (const [key, value] of Object.entries(lisperanto.customObjects)) 
    {
        if(typeof(value.type) !== 'undefined')
        {
            if(value.type === "rdf-predicate" )
            {
                lisperanto.rdf_predicates_Array.push(value);
            }
        }
    }
};