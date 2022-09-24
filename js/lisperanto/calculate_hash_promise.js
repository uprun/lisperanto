// Version hash: 3decd86784a63780b18c722fb0ec855c65e436dce9733e370b99311665befc52
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