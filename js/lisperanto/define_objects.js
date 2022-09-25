// Version hash: 424964ca609900d2725a7ac0f4caaf00170d6f514df43fdfac4f4884c65dfede
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_objects = function()
{
    lisperanto.customObjects = {};
    lisperanto.operations = [];
    lisperanto.has_new_version_map = {};
    lisperanto.mapOfOpenElements = {};
    lisperanto.desiredOffset = {x: 0, y: 0};
};