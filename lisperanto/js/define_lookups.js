// Version hash: 1c940fd560749a29c06a229bee850cd4504e11360be7d5b7125acf64cd41ff81
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_lookups = function()
{
    lisperanto.define_omniBoxTextInput(); // initialization
    lisperanto.define_somethingChanged(); // initialization
    lisperanto.define_filteredSearch(); // initialization

    lisperanto.define_rdf_predicates_Array(); // initialization
    lisperanto.define_filtered_rdf_predicates_Array(); // initialization
};