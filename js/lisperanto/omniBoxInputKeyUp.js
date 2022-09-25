// Version hash: bfe5b3368e2c44f0960eb7f1a24e639c212a55b725529004b165733ce22b8022
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxInputKeyUp = function( data, event)
{
    //console.log(event.code);
    if(event.code === "Escape")
    {
        lisperanto.hideOmniBox();
    }
    event.stopPropagation();
};