// Version hash: 38d415cab2b367b662d9b8c659dbdcb2ce83835ec2887d18402bc8ef09672102
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