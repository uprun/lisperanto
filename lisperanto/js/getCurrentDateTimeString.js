// Version hash: d4e347929a246f572e464c0761e84dc516cb04a83393816423b22a37affa0ccc
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