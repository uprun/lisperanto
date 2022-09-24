// Version hash: 3f262abe90236ec3a60fa74560abebe737e3173bb0f20662d49513b5ae369e9e
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