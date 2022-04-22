lookup.menuIsOpen = ko.observable(false);
lookup.menuWasAlreadyOpen=ko.observable(false);
lookup.toggleMenu = function() 
{
    event.stopPropagation();
    lookup.menuIsOpen(!lookup.menuIsOpen());
    lookup.menuWasAlreadyOpen(true);
};

lookup.hideMenu = function()
{
    if(lookup.menuIsOpen())
    {
        lookup.toggleMenu();
    }
};

lookup.showMenu = function()
{
    if(!lookup.menuIsOpen())
    {
        lookup.toggleMenu();
    }
};