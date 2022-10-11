// Version hash: df45448180dadfa8772c676793394eadf2e9b0b13b9ccb5416afd88455c246f1
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmousemove = function()
{
    //console.log(event);
    if(lisperanto.body_is_dragged())
    {
        const deltaX = event.movementX;
        const deltaY = event.movementY;
        lisperanto.globalOffsetX(lisperanto.globalOffsetX() + deltaX);
        lisperanto.globalOffsetY(lisperanto.globalOffsetY() + deltaY);
        lisperanto.applyMovement(0,0);
        lisperanto.total_movement_while_body_drag(lisperanto.total_movement_while_body_drag() + Math.abs(deltaX) + Math.abs(deltaY));
    }
};