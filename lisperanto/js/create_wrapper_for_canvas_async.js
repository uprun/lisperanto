// Version hash: 6b7ad9506b962f9d0bc371dc478d7900de3b7bd6483af3fd4f01942a3c3590be
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
            const new_hash = await lisperanto.calculate_hash_promise(wrapper_for_canvas["wrapped_one"]());
            const previous_hash = wrapper_for_canvas["id"]();
            lisperanto.mapOfOpenElements[new_hash] = lisperanto.mapOfOpenElements[previous_hash];
            delete lisperanto.mapOfOpenElements[previous_hash];
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