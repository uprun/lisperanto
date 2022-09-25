// Version hash: d18d800c471f922d36f3d99ca034e0aace2c1402aa0140a6c6c6f447dea795f7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.equal_exists_async = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    return hash in lisperanto.customObjects;
};