// Version hash: 4c07612625ab6f1d1002ed6a98be62e13fd85ee5301c9d1cde668a4c7c745293
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