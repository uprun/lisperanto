if(typeof(lookup) === 'undefined')
{
    lookup = {};
}
lookup.toggleFullScreen = function() 
{
    if (!document.fullscreenElement) 
    {
        document.documentElement.requestFullscreen();
    } else 
    {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
};