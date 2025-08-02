const colorOptions = ['catppuccin', 'picker', 'dark'];
let colorIndex = 0;

const modeOptions = ['draw', 'erase'];
let modeIndex = 0;

const gridOptions = ['on', 'off'];
let gridIndex = 0;

const brightnessOptions = ['none', 'darken', 'lighten'];
let brightnessIndex = 0;

const catppuccinColors = ['#f0c6c6', '#f5bde6', '#c6a0f6', '#ed8796', '#ee99a0', '#f5a97f', 
                            '#eed49f', '#a6da95', '#8bd5ca', '#91d7e3', '#7dc4e4', '#8aadf4', '#b7bdf8'];

function createGrid(size) { 
    const canvasContainer = document.querySelector('#canvas-container');
    canvasContainer.innerHTML = '';
    let squareSize = 550 / size;
    let isDrawing = false;
    for(let i = 0; i < size * size; i++){
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.addEventListener('mousedown', () => {
            applyColor(square);
            isDrawing = true;
        });
        square.addEventListener('mouseover', () => {
            if(isDrawing == true){
                applyColor(square);
            }
        });
        square.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        canvasContainer.appendChild(square);
    }
}

function changeColor(){
    colorIndex = (colorIndex + 1) % colorOptions.length;
    const newColor = colorOptions[colorIndex];
    colorButton.textContent = newColor;
}

function applyColor(squareElement){
    let square = document.querySelector('.square');
    if(colorIndex == 0){
        let randomColor = Math.floor(Math.random() * catppuccinColors.length);
        squareElement.style.backgroundColor = catppuccinColors[randomColor];
    } else if(colorIndex == 1){

    } else{

    }
}

function changeMode(){
    modeIndex = (modeIndex + 1) % modeOptions.length;
    const newMode = modeOptions[modeIndex];
    modeButton.textContent = newMode;
}

function changeGrid(){
    gridIndex = (gridIndex + 1) % gridOptions.length;
    const newGrid = gridOptions[gridIndex];
    gridButton.textContent = newGrid;
}

function changeBrightness(){
    brightnessIndex = (brightnessIndex + 1) % brightnessOptions.length;
    const newBrightness = brightnessOptions[brightnessIndex];
    brightnessButton.textContent = newBrightness;
}

function changeSize(){
    const newSize = parseInt(sizeInput.value);
    if(newSize >= 8 && newSize <= 32){
        createGrid(newSize);
    } else{
        sizeInput.value = 8;
        createGrid(8);
    }
}

const colorButton = document.querySelector('#color-div');
colorButton.addEventListener('click', () => {
    changeColor();
});

const modeButton = document.querySelector('#mode-div');
modeButton.addEventListener('click', () => {
    changeMode();
});

const gridButton = document.querySelector('#grid-div');
gridButton.addEventListener('click', () => {
    changeGrid();
});

const brightnessButton = document.querySelector('#brightness-div');
brightnessButton.addEventListener('click', () => {
    changeBrightness();
});

const sizeInput = document.querySelector('#size-input')
sizeInput.addEventListener('change', () => {
    changeSize();
});

createGrid(parseInt(sizeInput.value));
