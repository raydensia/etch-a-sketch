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
    initiateGrid();
})

const colorBtn = document.getElementById('colorBtn');
const randomBtn = document.getElementById('randomBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const gridBtn = document.getElementById('gridBtn');
const colorPicker = document.getElementById('colorPicker');

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
clearBtn.onclick = () => initiateGrid();
gridBtn.onclick = () => toggleGrid();


function createGrid(size, grid=true) {
    let gridContainer = document.createElement("div");
    let etchASketch = document.querySelector("#etch-a-sketch");
    if (etchASketch.hasChildNodes()) {
        etchASketch.innerHTML = "";
    }
    gridContainer.style.maxWidth = `${etchASketch.clientWidth}px`;
    gridContainer.style.maxHeight = `${etchASketch.clientHeight}px`;
    gridContainer.style.border = "0";

    for (let i = 0; i < size; i++) {
        let gridRow = document.createElement("div");
        gridRow.style.display = "flex";
        gridRow.style.maxWidth = `${etchASketch.clientWidth}px`;
        gridRow.style.minWidth = `${etchASketch.clientWidth}px`;
        gridRow.style.border = "0";
        for (let j = 0; j < size; j++) {
            let gridSquare = document.createElement("div");
            gridSquare.className = "gridSquare";
            gridSquare.style.minWidth = `${etchASketch.clientWidth / size}px`;
            gridSquare.style.minHeight = `${etchASketch.clientHeight / size}px`;
            if (grid) {
                gridSquare.style.border = "dotted 1px";
                gridSquare.style.borderColor = "rgba(0, 0, 0, 0.2)";
            }
            else {
                gridSquare.style.border = "none";
            }
            gridRow.appendChild(gridSquare);
        }
        gridContainer.appendChild(gridRow);
    }
    etchASketch.appendChild(gridContainer);
}

function toggleGrid() {
    gridState = !gridState;
    initiateGrid();
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

function initiateGrid() {
    createGrid(`${gridSlider.value}`, gridState);
    const gridSquares = document.querySelectorAll('.gridSquare');
    gridSquares.forEach(gridSquare => {
        gridSquare.addEventListener('mousedown', changeColor);
        gridSquare.addEventListener('mouseover', changeColor);
    })
}


initiateGrid();
currentMode = 'color';
activateButton(currentMode);




