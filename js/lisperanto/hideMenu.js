// Version hash: 3aa2c89fc97029a741ff5e230b0ec9184f30a615427fca87e6dd6ea2424085ec
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