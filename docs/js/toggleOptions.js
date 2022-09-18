lisperanto.optionsIsOpen = ko.observable(false);
lisperanto.optionsWasAlreadyOpen=ko.observable(false);
lisperanto.toggleOptions = function() 
{
    event.stopPropagation();
    lisperanto.optionsIsOpen(!lisperanto.optionsIsOpen());
    lisperanto.optionsWasAlreadyOpen(true);
};

lisperanto.hideOptions = function()
{
    if(lisperanto.optionsIsOpen())
    {
        lisperanto.toggleOptions();
    }
};

lisperanto.showMenu = function()
{
    if(!lisperanto.optionsIsOpen())
    {
        lisperanto.toggleOptions();
    }
};