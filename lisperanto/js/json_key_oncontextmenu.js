// Version hash: f6b68230e29797ac2e4eb64376ce9737197914afc366b74f012cc77780fa22ac
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.json_key_oncontextmenu = function(obj, parent)
{
    event.stopPropagation();
    const foundObj = parent.wrapped_one();
    //console.log(obj);
    //console.log(parent);
    lisperanto.desiredOffset = {
        x: parent.offsetX() + event.target.offsetLeft,
        y: parent.offsetY() + event.target.offsetTop + event.target.offsetHeight
    };
    
    lisperanto.focusedObj(parent);
    lisperanto.key_in_json_to_focus = obj;
    lisperanto.activeOperation("focused-on-existing-json-key");
    event.stopPropagation();
    //console.log(event);
    lisperanto.canvasOmniBox.visible(true);
    lisperanto.canvasOmniBox.left(lisperanto.desiredOffset.x);
    lisperanto.canvasOmniBox.top(lisperanto.desiredOffset.y);
    return false;
};