// Version hash: 2714556ee96897a36109e8723c14818691e72e75d6f3d913ec23fa15b5970467
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.getCurrentDateTimeString = function()
{
    var currentdate = new Date(); 
    const timeZone = currentdate.getTimezoneOffset()/(-60);
    var timeZoneString = "";
    if(timeZone > 0)
    {
        timeZoneString = " (+" + timeZone + ")";
    }
    if(timeZone < 0)
    {
        timeZoneString = " (-" + timeZone + ")";
    }
    var day = currentdate.getDate().toString().padStart(2, '0');
    var month = (currentdate.getMonth() + 1).toString().padStart(2, '0');
    const hours = currentdate.getHours().toString().padStart(2, '0');
    const minutes = currentdate.getMinutes().toString().padStart(2, '0');
    const seconds = currentdate.getSeconds().toString().padStart(2, '0');
    var datetime = 
        currentdate.getFullYear() + "-"
        + month + "-"
        + day + " "
        + hours + ":"  
        + minutes + ":" 
        + seconds
        + timeZoneString;
    return datetime;
};