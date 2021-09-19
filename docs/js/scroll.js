if(typeof(lookup) === 'undefined')
{
    lookup = {};
}
lookup.globalOffsetX = ko.observable(0.0);
lookup.globalOffsetY = ko.observable(0.0);
lookup.globalOffsetZ = ko.observable(1.0);
lookup.globalMaxX = ko.observable(2048);
lookup.globalMaxY = ko.observable(2048);
lookup.globalMinX = ko.observable(-2048);
lookup.globalMinY = ko.observable(-2048);

lookup.bodyOnWheel = function() {
    event.preventDefault();
    console.log(event);
    var newOffsetY = lookup.globalOffsetY() - event.deltaY * lookup.globalOffsetZ();
    newOffsetY = Math.min(newOffsetY, lookup.globalMaxY());
    newOffsetY = Math.max(newOffsetY, lookup.globalMinY());
    lookup.globalOffsetY( newOffsetY );
    var newOffsetX = lookup.globalOffsetX() - event.deltaX * lookup.globalOffsetZ();
    newOffsetX = Math.min(newOffsetX, lookup.globalMaxX());
    newOffsetX = Math.max(newOffsetX, lookup.globalMinX());
    lookup.globalOffsetX( newOffsetX );
  
    //scale += event.deltaY * -0.01;
};