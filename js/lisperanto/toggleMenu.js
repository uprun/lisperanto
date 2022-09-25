// Version hash: c687e210f27c57a1f5c1542427be69b6570eaaa91c4d630f82c6366cf96d2d72
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