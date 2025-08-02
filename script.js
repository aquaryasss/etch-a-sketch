const colorOptions = ['catppuccin', 'picker', 'dark'];
let colorIndex = 0;

const modeOptions = ['draw', 'erase'];
let modeIndex = 0;

const gridOptions = ['on', 'off'];
let gridIndex = 0;

const brightnessOptions = ['none', 'darken', 'lighten'];
let brightnessIndex = 0;

function createGrid(size) { 
    const canvasContainer = document.querySelector('#canvas-container');
    canvasContainer.innerHTML = '';
    let squareSize = 550 / size;
    for(let i = 0; i < size * size; i++){
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = '#363a4f';
        });
        square.addEventListener('mouseleave', () => {
            square.style.backgroundColor = '#24273a';
        });       
        canvasContainer.appendChild(square);
    }
}

function changeColor(){
    colorIndex = (colorIndex + 1) % colorOptions.length;
    const newColor = colorOptions[colorIndex];
    colorButton.textContent = newColor;
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
