var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
resize();

var pos = { x: 0, y: 0 };
var isDrawing = false;
var activeTool = "brush🖌️"; // Initial active tool is the brush

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function setPosition(e) {
    pos.x = e.clientX+6;
    pos.y = e.clientY-48;
}

function draw(e) {
    if (!isDrawing) return;

    var color = (activeTool === "eraser🧼") ? "#ffffff" : document.getElementById("colorPicker").value;
    var brushSize = document.getElementById("brushSize").value;

    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);

    ctx.stroke();
}

function startDrawing(e) {
    isDrawing = true;
    setPosition(e);
}

function stopDrawing() {
    isDrawing = false;
}

function toggleTool() {
    activeTool = (activeTool === "brush🖌️") ? "eraser🧼" : "brush🖌️";
    var toolButton = document.getElementById("toolToggle");
    toolButton.textContent = (activeTool === "eraser🧼") ? "Brush🖌️" : "Eraser🧼";
}

function setDefaultColor() {
    var defaultColor = document.getElementById("colorPicker").value;
    document.getElementById("hex").value = defaultColor;
}

window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", startDrawing);
document.addEventListener("mouseup", stopDrawing);

// Tool button event listener
var toolButton = document.getElementById("toolToggle");
toolButton.addEventListener("click", toggleTool);

// Set default color on page load
setDefaultColor();
