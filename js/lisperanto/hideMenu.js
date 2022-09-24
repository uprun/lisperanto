// Version hash: 40b2c946784af798d33e273eae7da96cbc2b7d105fbe0b25913ff2fbdfda957e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.hideMenu = function()
{
    if(lisperanto.menuIsOpen())
    {
        lisperanto.toggleMenu();
    }
};