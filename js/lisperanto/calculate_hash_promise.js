// Version hash: 7c5d8a93acfd0b878bfbc10fe881fded275e551976dbdd3e0bc822a49ed22365
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.calculate_hash_promise = function(obj)
{
    // from stackoverflow site I read that you can firt sort keys alphabetically then apply hash
    // but will do this later .. maybe 2022-09-21
    const string = JSON.stringify(obj);

    //https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd

    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
};