var canvas = document.querySelector("#canvas");
var dragOffset = {};
var isMouseDown = false;
function mouseDown(e) {
    isMouseDown = true;
    dragOffset.start = {};
    dragOffset.start.x = e.x;
    dragOffset.start.y = e.y;
}

function mouseMove(e) {
    if(!isMouseDown){
        return;
    }
    dragOffset.stop = {};
    dragOffset.stop.x = e.x;
    dragOffset.stop.y = e.y;
    var oX = dragOffset.stop.x - dragOffset.start.x;
    var oY = dragOffset.stop.y - dragOffset.start.y;
    canvas.style.transform = `translate3d(${oX}px, ${oY}px, 0px)`;
}

function mouseUp(e) {
    isMouseDown = false;
}