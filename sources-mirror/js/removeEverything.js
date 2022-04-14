if(typeof(lookup) === 'undefined')
{
    lookup = {};
}
lookup.removeEverything = function()
{
    localStorage.clear();
    location.reload();
};