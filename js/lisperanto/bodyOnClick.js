// Version hash: 5df30aa8594ea63738fc740a4b56f924d2a26a0ebd2e0bda1fbb5fc3e415106a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnClick = function(e)
{
    //console.log(event);
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };

    const drag_threshold = 3 * lisperanto.anchorWidth();
    if ( lisperanto.total_movement_while_body_drag() > drag_threshold )
    {
        // to prevent click handler after drag, but allow it if drag was small
        lisperanto.total_movement_while_body_drag(0);
        return;
    }

    if(lisperanto.menuIsOpen() || lisperanto.optionsIsOpen())
    {
        lisperanto.hideMenu();
        lisperanto.hideOptions();
    }

    lisperanto.showOmniBox();
};