// Version hash: b15136b4f5090b281507cb1721411f7a36a90dd229b4bc0f8d6f1bd896658a76
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.equal_exists_async = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    return hash in lisperanto.customObjects;
};