const colorOptions = ['random', 'picker', 'moon'];
let colorIndex = 0;

const modeOptions = ['draw', 'erase'];
let modeIndex = 0;

const gridOptions = ['on', 'off'];
let gridIndex = 0;

const brightnessOptions = ['none', 'darken', 'lighten'];
let brightnessIndex = 0;

const catppuccinColors = ['#f0c6c6', '#f5bde6', '#c6a0f6', '#ed8796', '#ee99a0', '#f5a97f', 
                            '#eed49f', '#a6da95', '#8bd5ca', '#91d7e3', '#7dc4e4', '#8aadf4', '#b7bdf8'];
let pickedColor = catppuccinColors[0];

const moonColors = ['#b8c0e0', '#a5adcb', '#939ab7', '#8087a2', '#6e738d', '#5b6078', '#494d64', '#1e2030'];

let isDrawing = false;

window.addEventListener('mouseup', () => {
    isDrawing = false;
});

function createGrid(size) { 
    const canvasContainer = document.querySelector('#canvas-container');
    canvasContainer.innerHTML = '';
    let squareSize = 550 / size;
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
        canvasContainer.appendChild(square);
    }
}

function changeColor(){
    colorIndex = (colorIndex + 1) % colorOptions.length;
    const newColor = colorOptions[colorIndex];
    colorButton.textContent = newColor;
    if (newColor == 'picker'){
        palettePicker.classList.remove('hidden');
    }else{
        palettePicker.classList.add('hidden');
    }
}

function applyColor(squareElement){
    let square = document.querySelector('.square');
    if(modeIndex == 1){
        squareElement.style.backgroundColor = '#24273a';
        return;
    }
    if(colorIndex == 0){
        let randomColor = Math.floor(Math.random() * catppuccinColors.length);
        squareElement.style.backgroundColor = catppuccinColors[randomColor];
    } else if(colorIndex == 1){
        squareElement.style.backgroundColor = pickedColor;
    } else if(colorIndex == 2){
        let randomMoonColor = Math.floor(Math.random() * moonColors.length);
        squareElement.style.backgroundColor = moonColors[randomMoonColor];
    } else if(isErasing == true){
        squareElement.style.backgroundColor = '#24273a';
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
    const allSquares = document.querySelectorAll('.square');
    let newBorderColor;
    if(gridIndex == 1)
        newBorderColor = '#24273a';
    else
        newBorderColor = '#181926';
    allSquares.forEach(square => {
        square.style.borderColor = newBorderColor;
    }); 
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

function createPalette(){
    catppuccinColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.classList.add('palette-choice');
        swatch.style.backgroundColor = color;
        swatch.addEventListener('click', () => {
            pickedColor = color;
            const currentSelected = document.querySelector('.palette-choice.selected');
            if(currentSelected)
                currentSelected.classList.remove('selected');
            swatch.classList.add('selected');
        });
        palettePicker.appendChild(swatch);
    });
    if(palettePicker.firstChild)
        palettePicker.firstChild.classList.add('selected');
    palettePicker.classList.add('hidden');
        
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

const palettePicker = document.querySelector('#picker-palette');

createPalette();
createGrid(parseInt(sizeInput.value));
