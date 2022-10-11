// Version hash: 1087f7f57e549531cdce9f1bd6396c13f950fb87ee61e3664029259aea4d6120
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.activate_replace_json_key = function()
{
    lisperanto.activeOperation("replace-existing-json-key");
    $("#" + lisperanto.canvasOmniBox.id ).focus();
};