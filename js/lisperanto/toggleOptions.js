// Version hash: a792a985818a334fd335206397bd977bbc5a65189a2dab03e5b21c7dc1c81770
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