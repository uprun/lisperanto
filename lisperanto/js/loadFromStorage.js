// Version hash: d1cd4f7938530bff8531b0eb62ad6ccdd807162105acf9eaf4c0021a56762c7a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.loadFromStorage = function()
{
    for (const [keyInner, valueInner] of Object.entries(localStorage)) 
    {
        try 
        {
            var parsed = JSON.parse(valueInner);
            if ("previous-version@lisperanto" in parsed)
            {
                const previous_version = parsed["previous-version@lisperanto"];
                lisperanto.has_new_version_map[previous_version] = keyInner;
            }
            lisperanto.customObjects[keyInner] = parsed;
            lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
        } catch(e) 
        {
            console.log("Failed to parse: ", {key: keyInner, value: valueInner});
        }
    }
};