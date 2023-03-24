let gridState = true;
let mouseDown = false;
let currentMode;

//always check if mouse is pressed
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Code for grid size slider
const gridSlider = document.querySelector('#gridSlider');
const gridSizeText = document.querySelector('#gridSizeText');
gridSizeText.textContent = `${gridSlider.value} x ${gridSlider.value}`;
gridSlider.addEventListener("input", (event) => {
    gridSizeText.textContent = `${event.target.value} x ${event.target.value}`;
})
gridSlider.addEventListener("mouseup", () => createGrid(`${gridSlider.value}`, gridState));

const colorBtn = document.getElementById('colorBtn');
const randomBtn = document.getElementById('randomBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const gridBtn = document.getElementById('gridBtn');
const colorPicker = document.getElementById('colorPicker');
const grid = document.getElementById('etch-a-sketch');

colorBtn.onclick = () => {
    currentMode = 'color';
    activateButton(currentMode);
}
randomBtn.onclick = () => {
    currentMode = 'random';
    activateButton(currentMode);
}
eraserBtn.onclick = () => {
    currentMode = 'eraser';
    activateButton(currentMode);
}
clearBtn.onclick = () => createGrid(`${gridSlider.value}`, gridState);
gridBtn.onclick = () => toggleGrid();


function createGrid(size, gridstate=true) {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${gridSlider.value}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${gridSlider.value}, 1fr)` 
    
    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('gridSquare');
        if (gridstate) {
            gridSquare.style.border = "dotted 1px";
            gridSquare.style.borderColor = "rgba(0, 0, 0, 0.2)";
        }
        else {
            gridSquare.style.border = "none";
        }
        gridSquare.addEventListener('mouseover', changeColor);
        gridSquare.addEventListener('mousedown', changeColor);
        grid.appendChild(gridSquare);
    }
}

function toggleGrid() {
    gridState = !gridState;
    createGrid(`${gridSlider.value}`, gridState);
    if (gridState) {
        document.getElementById("gridBtn").textContent = "Hide Grid";
    }
    else {
        document.getElementById("gridBtn").textContent = "Show Grid";
    }
}

function changeColor(e) {
    if (e.type == 'mouseover' && !mouseDown) return;
    if (currentMode == 'random') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if (currentMode == 'eraser') {
        e.target.style.backgroundColor = "white";
    }
    else if (currentMode == 'color') {
        e.target.style.backgroundColor = colorPicker.value;
    }


};

function activateButton(currentMode) {
    if (currentMode == 'color') {
        colorBtn.classList.add('active');
        randomBtn.classList.remove('active');
        eraserBtn.classList.remove('active');
    }
    else if (currentMode == 'random') {
        colorBtn.classList.remove('active');
        randomBtn.classList.add('active');
        eraserBtn.classList.remove('active');
    }
    else if (currentMode == 'eraser') {
        colorBtn.classList.remove('active');
        randomBtn.classList.remove('active');
        eraserBtn.classList.add('active');
    }
}



createGrid(`${gridSlider.value}`, gridState);
currentMode = 'color';
activateButton(currentMode);




