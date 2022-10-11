// Version hash: 4892b5a9b7a93abb7dc264585680bc73bac93e2de411054aef6675a89efba10c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyKeyDown = function( data, event)
{
    // turns out Firefox has a bug 
    // see https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
    if (event.isComposing || event.keyCode === 229) {
        console.log("Fixign composing bug in Firefox")
        return;
    }
    //console.log(event.code);
    if(event.code === "Escape")
    {
        lisperanto.hideOmniBox();
        lisperanto.hideMenu();
    }
    if(event.code === "KeyI")
    {
        lisperanto.toggleMenu();
    }

    if(event.code === "KeyO")
    {
        lisperanto.toggleOptions();
    }

    if(event.code === "KeyF")
    {
        lisperanto.toggleFullScreen();
    }

    return true;

};