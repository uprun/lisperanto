// Version hash: 25422bbe2453cf3db214f6d86254196d7b5f9bde159c4de63203a27d2b03bd6c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onload_async = async function()
{
    lisperanto.main_initialization(); // initialization
    
    lisperanto.loadFromStorage();
    lisperanto.loadCustomObjectsFromServer();

    lisperanto.load_operations_from_server();
    lisperanto.backgroundApplySaved();
    lisperanto.restore_RDF_predicates_array();
    lisperanto.defineTimerForFunctions();
    
    ko.applyBindings(lisperanto);

    lisperanto.center_omni_box();

    // this is for getting new version from text to storage

    await lisperanto.migrate_all_function_to_storage_async();
};