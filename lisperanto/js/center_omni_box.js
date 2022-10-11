// Version hash: ced913b6a91ad6de80e7a9c46bfd8ba5f00243dff128cc11efc2fe7fe5dc7b20
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.center_omni_box = function () {
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox,
        {
            x: 0,
            y: document.body.offsetHeight / 3
        });

    const width_of_omnibox = document.getElementById("contextual-omni-box").offsetWidth;
    const delta_x_2 = Math.max(0, (document.body.offsetWidth / 2 - width_of_omnibox / 2));
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox,
        {
            x: delta_x_2,
            y: document.body.offsetHeight / 3
        });
};