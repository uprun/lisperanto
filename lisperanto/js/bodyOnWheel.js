// Version hash: 1fa23292e1022dc0b7730f8ee7a122a580d941868318b720995ebc23ca7ab2fb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnWheel = function() {
// really changing to span fixes breaks?
// yeah if you want correct line-break use span instead of div
// just test  
// what if there is more text?

    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lisperanto.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;


};