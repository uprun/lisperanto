if(typeof(lookup) === 'undefined')
{
    lookup = {};
}
lookup.globalOffsetX = ko.observable(0.0);
lookup.globalOffsetY = ko.observable(0.0);
lookup.globalOffsetZ = ko.observable(1.0);
lookup.bodyOnWheel = function() {
    event.preventDefault();
    console.log(event);
    lookup.globalOffsetY( lookup.globalOffsetY() +  event.deltaY * lookup.globalOffsetZ() );
    lookup.globalOffsetX( lookup.globalOffsetX() +  event.deltaX * lookup.globalOffsetZ() );
  
    //scale += event.deltaY * -0.01;
};