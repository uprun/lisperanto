// Version hash: e78b008eb19600f8ce65520c8f9ce2221b68327379c58299fefdcf6559882b08
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnWheel = function() {
// really changing to span fixes breaks?
// yeah if you want correct line-break use span instead of div
// just test

console.log("42");  

    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lisperanto.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;



    console.log('body_on_wheel');

};