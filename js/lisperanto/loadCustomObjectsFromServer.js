// Version hash: e86ffc692d26b8bc093adc794b3b400e02b33a2c0b16d881acbacbb3bf6d10d3
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.loadCustomObjectsFromServer = function()
{
    $.get('Home/ListOfCustomObjects', function(data, status){
        console.log(data);
      });
};