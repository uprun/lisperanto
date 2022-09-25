// Version hash: 8c1e09b95c87a0440ee493d03a81513d5933f770d6ef04820a74cf0b87eebf0e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_OmniBox_for_adding_text_value_to_json_entry = async function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-text-value-to-json-entry");

    const id = await caller.id();

    lisperanto.filloutOmniBoxDataForFunction(`#${id} #add-text-value-to-json-entry--`, lisperanto.canvasOmniBox, caller);
};