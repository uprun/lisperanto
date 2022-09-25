// Version hash: f789e44a140764410cc795bd227d6bff397c1e38c30b784d47e47a8f911a136f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onload_async = async function()
{
    lisperanto.main_initialization(); // initialization
    
    lisperanto.loadFromStorage();
    lisperanto.loadCustomObjectsFromServer();
    lisperanto.backgroundApplySaved();
    lisperanto.restore_RDF_predicates_array();
    lisperanto.defineTimerForFunctions();
    
    ko.applyBindings(lisperanto);

    lisperanto.center_omni_box();

    // this is for getting new version from text to storage

    await lisperanto.migrate_all_function_to_storage_async();
};