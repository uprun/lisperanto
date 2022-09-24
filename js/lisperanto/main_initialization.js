// Version hash: 6f1f6f1063c9efab9ca92671fa02fd80c19f6c561ff5f263fafa770b5690d37f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.main_initialization = function () {
    lisperanto.define_objects();

    lisperanto.define_lookups();

    lisperanto.define_activeOperation(); // initialization
    lisperanto.define_focusedObj(); // initialization

    lisperanto.define_listOfOpenElements(); // initialization

    lisperanto.define_body_is_dragged(); // initialization

    lisperanto.define_total_movement_while_body_drag(); // initialization

    lisperanto.define_canvasOmniBox(); // initialization

    lisperanto.define_anchorWidth(); // initialization

    lisperanto.define_backgroundColor(); // initialization

    lisperanto.define_global_offsets(); // initialization

    lisperanto.define_menuIsOpen(); // initialization
    lisperanto.define_menuWasAlreadyOpen(); // initialization

    lisperanto.define_optionsIsOpen(); // initialization
    lisperanto.define_optionsWasAlreadyOpen();
};