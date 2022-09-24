// Version hash: c88cb70046875cbe9477f844f973c6ba1ab6b2e477b032ddb0f6726099faba19
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_filtered_rdf_predicates_Array = () =>
{
    lisperanto.filtered_rdf_predicates_Array = ko.computed(function()
    {
        var searchQuery = lisperanto.omniBoxTextInput().trim().toLowerCase();
        var filtered = [];

        const mapped = ko.utils.arrayMap(lisperanto.rdf_predicates_Array(), function(obj) {
            var name = obj["name@lisperanto"];
            return { 
                id: obj.id, 
                text: name
            };
        });

        if(searchQuery === "")
        {
            filtered = mapped;
        }
        else
        {
            filtered = ko.utils.arrayFilter(mapped, function(item)
            {
                return item.text.toLowerCase().indexOf(searchQuery) >= 0;
            });
        }

        return filtered;
    });

};