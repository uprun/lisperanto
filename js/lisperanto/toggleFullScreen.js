// Version hash: 235cbf136cd39c18f740290768c1dda243328c51f044b8206906cc9eee443a68
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleFullScreen = function() 
{
    var element = document.documentElement;
    const rfs = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;
  
    if (!document.fullscreenElement) 
    {
        rfs.call(element);
        //document.documentElement.requestFullscreen();
    } else 
    {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    event.stopPropagation();
};