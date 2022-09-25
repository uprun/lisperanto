// Version hash: 3e995d6707fdc346adba40d21795ec588b8f0ad02418a3c49caf40be244ff307
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.operationsPush_async = async function(some)
{
    lisperanto.operations.push(some);
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