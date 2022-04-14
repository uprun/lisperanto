lookup.optionsIsOpen = ko.observable(false);
lookup.optionsWasAlreadyOpen=ko.observable(false);
lookup.toggleOptions = function() 
{
    event.stopPropagation();
    lookup.optionsIsOpen(!lookup.optionsIsOpen());
    lookup.optionsWasAlreadyOpen(true);
};

lookup.hideOptions = function()
{
    if(lookup.optionsIsOpen())
    {
        lookup.toggleOptions();
    }
};

lookup.showMenu = function()
{
    if(!lookup.optionsIsOpen())
    {
        lookup.toggleOptions();
    }
};