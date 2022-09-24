// Version hash: fc714e837337f9a471d55662627d61dbba352b3ecffb8c7a630a9d5c20ff90e7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.showMenu = function()
{
    if(!lisperanto.optionsIsOpen())
    {
        lisperanto.toggleOptions();
    }
};