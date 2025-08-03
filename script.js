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
    let squareSize = 100 / size;
    for(let i = 0; i < size * size; i++){
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}%`;
        square.style.height = `${squareSize}%`;
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
        squareElement.style.borderColor = '#18196';
        squareElement.style.borderSize = '0.1px';
        squareElement.style.opacity = 1;
        return;
    }
    if(brightnessIndex == 1){
        let currentOpacity = parseFloat(window.getComputedStyle(squareElement).getPropertyValue("opacity"));
        let newOpacity = Math.max(0.1, currentOpacity - 0.1);
        squareElement.style.opacity = newOpacity;
        return; 
    } else if(brightnessIndex == 2){
        let currentOpacity = parseFloat(window.getComputedStyle(squareElement).getPropertyValue("opacity"));
        let newOpacity = Math.min(1, currentOpacity + 0.1);
        squareElement.style.opacity = newOpacity;
        return;
    }
    squareElement.style.opacity = 1;
    if(colorIndex == 0){
        colorMode(squareElement, 0);
    } else if(colorIndex == 1){
        colorMode(squareElement, 1);
    } else if(colorIndex == 2){
        colorMode(squareElement, 2);
    } else if(isErasing == true){
        squareElement.style.backgroundColor = '#24273a';
    }
}

function colorMode(squareElement, indexNum){
    if(indexNum == 0){
        let randomColor = Math.floor(Math.random() * catppuccinColors.length);
        squareElement.style.backgroundColor = catppuccinColors[randomColor];
    } else if(indexNum == 1){
        squareElement.style.backgroundColor = pickedColor;
    } else if(indexNum == 2){
        let randomMoonColor = Math.floor(Math.random() * moonColors.length);
        squareElement.style.backgroundColor = moonColors[randomMoonColor];
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
    if(gridIndex == 1){
        allSquares.forEach(square => {
            square.style.border = 'none';
        });
    }else{
        allSquares.forEach(square => {
            square.style.border = '0.1px solid #181926';
        });
    }
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
