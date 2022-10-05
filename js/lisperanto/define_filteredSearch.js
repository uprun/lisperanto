// Version hash: 354b72c28cbea5177f30566fd8ff131ce007daac81addaf36ce9e8d987cf703e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_filteredSearch = () => {

    lisperanto.filteredSearch = ko.computed(

        function()

        {

            var changeOccured = lisperanto.somethingChanged();

            var searchQuery = lisperanto.omniBoxTextInput().trim().toLowerCase();

            var filtered = [];

            const availableKeys = Object.keys(lisperanto.customObjects);

    

            const non_statements = ko.utils.arrayFilter(availableKeys, function(key)

                {


                    const has_new_version = key in lisperanto.has_new_version_map;

                    if(has_new_version)
                        return false;

                    const obj = lisperanto.customObjects[key];
                    var name = "";
                    if("name@lisperanto" in obj)
                    {
                        name = obj["name@lisperanto"];

                    }

                    if(name in lisperanto["lookup_by_name"])
                    {
                        var latest_operation_key = lisperanto["lookup_by_name"][name];
                        var operation = lisperanto.operations[latest_operation_key];
                        if (operation.id_to != key)
                            return false;
                    }

                    
                    return true;

                });

    

            const mapped = ko.utils.arrayMap(non_statements, function(key) {

                const obj = lisperanto.customObjects[key];

                var name = "";

                if("name@lisperanto" in obj)

                {

                    name = obj["name@lisperanto"];

                }

    

                if( "name" in obj )

                {

                    name = obj["name"]

                }

    

                if(name === "")

                {

                    name = "no-name " + obj.id;

                }

                

                var toReturn = {

                    id: key,

                    text: name,

                    full_text: JSON.stringify(obj).toLowerCase()

                };

    

                toReturn["search_index_text"] = toReturn.text.toLowerCase().indexOf(searchQuery);

                toReturn["search_index_full_text"] = toReturn.full_text.indexOf(searchQuery);

                return toReturn;

                

            });

    

            if(searchQuery === "")

            {

                filtered = mapped;

            }

            else

            {

                filtered = ko.utils.arrayFilter(mapped, function(item)

                {

                    return item["search_index_text"] >= 0 || item["search_index_full_text"]  >= 0;

                });

            }

    

            filtered = filtered.map(element => {

                const index = element["search_index_full_text"];

                if (searchQuery !== "" && element["search_index_text"] < 0 &&  index >= 0)

                {

                    const new_text = element.full_text.substring(index - 5, index + searchQuery.length + 5);

                    element.text = element.text + "  ..." + new_text;

                }

                return element;

            });

    

            return filtered;

        }

    );

};