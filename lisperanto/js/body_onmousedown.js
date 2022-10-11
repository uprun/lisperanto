// Version hash: c3abc317d99b0dc49723f862b0e7e5ad6bdab6688d36f1675a689799979925eb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmousedown = function()
{
    //console.log(event);
    lisperanto.body_is_dragged(true);
    lisperanto.total_movement_while_body_drag(0)
};