// Version hash: bef6da2af2afd992a827e35ee5efbd1d83bd9c8f06c03ee6aaed1ae55e3fb01c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_wrapper_for_canvas_async = async function(value)
{
    var wrapper_for_canvas = 
    {
        wrapped_one: ko.observable(value),
        "key_with_changes@lisperanto": ko.observable(""),
        "new_value@lisperanto": ko.observable(""),
        offsetX: ko.observable(0),
        offsetY: ko.observable(0),
    };

    wrapper_for_canvas["id"] = ko.observable(await lisperanto.calculate_hash_promise(wrapper_for_canvas["wrapped_one"]()));
    wrapper_for_canvas["wrapped_one"].subscribe(async () => 
        {
            
            const previous_hash = wrapper_for_canvas["id"]();
            lisperanto.mapOfOpenElements[new_hash] = lisperanto.mapOfOpenElements[previous_hash];
            delete lisperanto.mapOfOpenElements[previous_hash];
            const new_hash = await lisperanto.calculate_hash_promise(wrapper_for_canvas["wrapped_one"]());
            return wrapper_for_canvas["id"](new_hash);
        });

    wrapper_for_canvas.inWorldOffsetX = ko.computed(function()
    {
        return wrapper_for_canvas.offsetX() + lisperanto.globalOffsetX();
    });

    wrapper_for_canvas.inWorldOffsetY = ko.computed(function()
    {
        return wrapper_for_canvas.offsetY() + lisperanto.globalOffsetY();
    });
    return wrapper_for_canvas;
};