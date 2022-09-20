if(typeof(lisperanto) === 'undefined')
{
    lisperanto = {};
}

lisperanto.define_menuIsOpen = () => lisperanto.menuIsOpen = ko.observable(false);
lisperanto.define_menuWasAlreadyOpen = () => lisperanto.menuWasAlreadyOpen = ko.observable(false);
lisperanto.toggleMenu = function() 
{
    event.stopPropagation();
    lisperanto.menuIsOpen(!lisperanto.menuIsOpen());
    lisperanto.menuWasAlreadyOpen(true);
};

lisperanto.hideMenu = function()
{
    if(lisperanto.menuIsOpen())
    {
        lisperanto.toggleMenu();
    }
};

lisperanto.showMenu = function()
{
    if(!lisperanto.menuIsOpen())
    {
        lisperanto.toggleMenu();
    }
};