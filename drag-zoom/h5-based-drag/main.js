var canvas = document.querySelector("#canvas");
var container = document.querySelector(".container");
var marker = document.querySelector("#marker");
var elements = document.querySelectorAll("#canvas > div");
var elementMouseDown = false;
var elementOffset = {};
var currentEvent = {};
document.onmouseup = mouseUp;
document.onmousemove = mouseMove;
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
        elementOffset.x = e.x / scaleFactor - e.target.offsetLeft;
        elementOffset.y = e.y / scaleFactor - e.target.offsetTop;
        currentEvent.target = e.target;
    }
    stopEvent(e);
}

function mouseMove(e) {
    if (!isMouseDown) {
        return;
    }
    console.log("L: " + e.x + ", R: " + e.y);
    if (currentEvent.target.id == "canvas") {
        var oX = e.x - dragOffset.start.x;
        var oY = e.y - dragOffset.start.y;
        dragOffset.start = {};
        dragOffset.start.x = e.x;
        dragOffset.start.y = e.y;
        container.scrollLeft = container.scrollLeft - oX;
        container.scrollTop = container.scrollTop - oY;
    } else {
        var width = canvas.offsetWidth - 160;
        var height = canvas.offsetHeight - 160;

        var x = e.x / scaleFactor - elementOffset.x;
        x = Math.min(Math.max(0, x), width);
        var y = e.y / scaleFactor - elementOffset.y;
        y = Math.min(Math.max(0, y), height);

        currentEvent.target.style.left = x + 'px';
        currentEvent.target.style.top = y + 'px';
    }
    stopEvent(e);
}

function mouseUp(e) {
    isMouseDown = false;
}

var scaleFactor = 1;
function noZoom() {
    scaleFactor = 1;
    doZoom();
}
function zoomOut() {
    doZoom(scaleFactor - 0.3);
}

function zoomIn() {
    doZoom(scaleFactor + 0.3);
}
function doZoom(tempSF) {
    if (tempSF < 0.3 || tempSF > 1.6) {
        alert("已经达到最" + (scaleFactor > 1 ? "大" : "小"));
        return;
    }
    scaleFactor = tempSF;
    canvas.style.transform = "scale(" + scaleFactor + ")";
}
