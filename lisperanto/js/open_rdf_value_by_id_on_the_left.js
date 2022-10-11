// Version hash: 8bca7c940e497023a25d3cf83f1d93986eba2b96290fff8a7183cbcfc6b20ebe
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_rdf_value_by_id_on_the_left = function(statement)
{
    event.stopPropagation();
    const id = statement.value_id();
    const main_ui = document.getElementById(statement.object_id);
    const main_rdf_entry = lisperanto.customObjects[statement.object_id];
    const offset = {
        x: main_rdf_entry.offsetX() - main_ui.offsetWidth,
        y: main_rdf_entry.offsetY()
    };
    lisperanto.desiredOffset = offset;
    const rdf_entry = lisperanto.customObjects[id];
    lisperanto.openElement(rdf_entry);
};