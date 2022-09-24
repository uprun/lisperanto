// Version hash: 25ed1b8e6188caaabdb4e0969d42268b2c976ff3c49620fad293a8738d94a620
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