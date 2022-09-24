// Version hash: 6b119ba07861ec2243fe4d0c88865820ca1a08e9b9d610934f38f8041a92a43e
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