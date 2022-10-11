// Version hash: 9f88afe400f02a52ed415ad5278bb230098f9f132201be962ea4e3a41fb8a9ff
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