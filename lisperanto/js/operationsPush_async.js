// Version hash: b4a8a4044b4b31e13bc393cfaad45f1ff7c31c37ba2d6aa12516ae5381d2c036
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.operationsPush_async = async function(some)
{
    //lisperanto.operations.push(some);
    const key = some["id_to"] ;
    const value = lisperanto.customObjects[key];

    if ("previous-version@lisperanto" in value)
    {
        const previous_version = value["previous-version@lisperanto"];
        lisperanto.has_new_version_map[previous_version] = key;
    }

    var toAdd = {};
    for (const [keyInner, valueInner] of Object.entries(value)) {
        if(typeof(valueInner) === 'function')
        {
        }else
        {
            toAdd[keyInner] = valueInner;
        }
    }
    var data = JSON.stringify(toAdd);
    localStorage.setItem(key, data);
    lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
    $.post("Home/SaveCustomObject",
    {
        hash: key,
        value: data
    });
    if ("time" in some)
    {
        const operation_hash = await lisperanto.calculate_hash_promise(some);
        $.post("Home/SaveOperation",
        {
            hash: some["time"] + " " + operation_hash,
            value: JSON.stringify(some)
        });
    }
};