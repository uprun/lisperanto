// Version hash: ee11c805d4bad03d1f8d3c2794abbda936cbd832ed96e91947dea3d55f892734
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleMenu = function() 
{
    event.stopPropagation();
    lisperanto.menuIsOpen(!lisperanto.menuIsOpen());
    lisperanto.menuWasAlreadyOpen(true);
};