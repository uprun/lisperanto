// Version hash: d00ec35123a51fafdac5dac96043b17cbeb7fd9cb1cb3c8efb42a34925d40402
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onload_async = async function()
{
    lisperanto.main_initialization(); // initialization
    
    lisperanto.loadFromStorage();
    lisperanto.backgroundApplySaved();
    lisperanto.restore_RDF_predicates_array();
    lisperanto.defineTimerForFunctions();
    
    ko.applyBindings(lisperanto);

    lisperanto.center_omni_box();

    // this is for getting new version from text to storage

    await lisperanto.migrate_all_function_to_storage_async();
};