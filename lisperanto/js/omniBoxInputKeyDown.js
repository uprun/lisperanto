// Version hash: 2c681c7a88dbf83449bd4042c1ba7e607d404659d08d020b0e5cd0a36febed11
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxInputKeyDown = function(data, event)
{
    //console.log(event.originalEvent);
    if(event.originalEvent.code == "Tab")
    {
        // here I will need to cycle through available options
    }
    return true;
};