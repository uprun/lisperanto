// Version hash: 1533157d6b79f35e462717efbf918652d0db6fe8739b5c37c52367b831b68532
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_OmniBox_for_adding_statement_to_json_entry_async = async function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-statement-key-to-json-entry");

    const id = await caller.id();
    lisperanto.filloutOmniBoxDataForFunction(`#${id} #add-statement-to-json-entry--`, lisperanto.canvasOmniBox, caller);
};