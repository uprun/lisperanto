lookup.menuIsOpen = ko.observable(false);
lookup.menuWasAlreadyOpen=ko.observable(false);
lookup.toggleMenu = function() 
{
    lookup.menuIsOpen(!lookup.menuIsOpen());
    lookup.menuWasAlreadyOpen(true);
};