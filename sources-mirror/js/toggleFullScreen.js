if(typeof(lookup) === 'undefined')
{
    lookup = {};
}
lookup.toggleFullScreen = function() 
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