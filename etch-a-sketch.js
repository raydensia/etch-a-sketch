function createGrid(size) {
    let gridContainer = document.createElement("div");
    let etchASketch = document.querySelector("#etch-a-sketch");
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
            gridSquare.style.minWidth = `${etchASketch.clientWidth / size}px`;
            gridSquare.style.minHeight = `${etchASketch.clientHeight / size}px`;
            gridSquare.style.border = "dotted 1px";
            gridSquare.style.borderColor = "rgba(0, 0, 0, 0.2)";
            gridRow.appendChild(gridSquare);
        }
        gridContainer.appendChild(gridRow);
    }
    etchASketch.appendChild(gridContainer);
}

createGrid(50);