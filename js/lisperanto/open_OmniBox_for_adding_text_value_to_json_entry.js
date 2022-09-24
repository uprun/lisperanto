// Version hash: 396762e033c5d3c872c80f7356884a07a4bb87332f7287be953ef4b967010e7f
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