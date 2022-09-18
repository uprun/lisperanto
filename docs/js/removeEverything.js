if(typeof(lisperanto) === 'undefined')
{
    lisperanto = {};
}
lisperanto.removeEverything = function()
{
    localStorage.clear();
    location.reload();
};