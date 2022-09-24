// Version hash: 23ce29162dc0ad87b2120282a795d52a16d94a7b305e30a3e6dd1140a577b3be
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.closeElement = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    if(hash in lisperanto.mapOfOpenElements)
    {
        const wrapper = lisperanto.mapOfOpenElements[hash];
        lisperanto.listOfOpenElements.remove(wrapper);
        delete lisperanto.mapOfOpenElements[hash];
    }
};