// Version hash: 96b85289c5163e153f375b42c0baec7f514b141450e2bfb1aac860400b473482
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