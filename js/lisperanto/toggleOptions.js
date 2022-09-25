// Version hash: f365b3416ec9b167b7258e673ee2f4bfb0d7d41351bee40d95ec21310e16e8ce
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleOptions = function() 
{
    event.stopPropagation();
    lisperanto.optionsIsOpen(!lisperanto.optionsIsOpen());
    lisperanto.optionsWasAlreadyOpen(true);
};