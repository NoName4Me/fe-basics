var canvas = document.querySelector("#canvas");
var container = document.querySelector(".container");

var elements = document.querySelectorAll("#canvas > div");
var elementMouseDown = false;
var elementOffset = {};
var currentEvent = {};
function stopEvent(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
    e.preventDefault();
    //e.returnValue = false;

}

var dragOffset = {};
var isMouseDown = false;
function mouseDown(e) {
    isMouseDown = true;
    if (e.target.id == "canvas") {
        currentEvent.target = e.target;
        dragOffset.start = {};
        dragOffset.start.x = e.x;
        dragOffset.start.y = e.y;
    } else {
        elementOffset.x = e.x - e.target.offsetLeft;
        elementOffset.y = e.y - e.target.offsetTop;
        currentEvent.target = e.target;
    }
    stopEvent(e);
}

function mouseMove(e) {
    if (!isMouseDown) {
        return;
    }
    if (currentEvent.target.id == "canvas") {
        dragOffset.stop = {};
        dragOffset.stop.x = e.x;
        dragOffset.stop.y = e.y;
        var oX = dragOffset.stop.x - dragOffset.start.x;
        var oY = dragOffset.stop.y - dragOffset.start.y;

        container.scrollLeft -= oX;
        container.scrollTop -= oY;
    } else {
        var width = canvas.offsetWidth - 60;
        var height = canvas.offsetHeight - 60;

        var x = e.x - elementOffset.x;
        x = Math.min(Math.max(0, x), width);
        var y = e.y - elementOffset.y;
        y = Math.min(Math.max(0, y), height);

        currentEvent.target.style.left = x + 'px';
        currentEvent.target.style.top = y + 'px';
    }
    stopEvent(e);
}

function mouseUp(e) {
    isMouseDown = false;
}

function zoomIn() {

}


function zoomOut() {
    canvas.style.transform = "scale(2)"
}

function zoomIn() {
    canvas.style.transform = "scale(.5)";
}
