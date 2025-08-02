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

createGrid(8);
