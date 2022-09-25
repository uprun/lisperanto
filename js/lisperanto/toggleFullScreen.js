// Version hash: 87823d4f3e1d8d780b3c6b9ed9030c8135ff0613b9ce768e370a0fb0bd9877a5
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