// Version hash: 3230184f25346d113b61db98397cfad4db9c3f150a350ece581cb0f423e646b0
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