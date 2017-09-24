Array.prototype.pushIfNotExits = function(item) {
    return this.includes(item) ? this.length : this.push(item)
}



function processMouseOver(target) {
    target.classList.remove("mouse-out");
}

function processMouseOut(target) {
    var targetClassList = target.classList.value.split(" ");
    targetClassList.pushIfNotExits("mouse-out");
    target.classList.value = targetClassList.join(" ");    
}