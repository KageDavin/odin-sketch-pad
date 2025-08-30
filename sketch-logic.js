//  Make sure all the elements are loaded
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('gridContainer');
 
    // Initial grid creation on page load
    createGrid(16);

    // btnCommandCenter - Dynamically creeate buttons

    const commandCenter = document.getElementById('buttonCommandCenter');

    function createCommandButton(text, id, clickEventHandler) {
    commandButton = document.createElement('button');
        commandButton.textContent = text;
        commandButton.id = id;
        commandButton.addEventListener('click', clickEventHandler);
        return commandButton;

    }

    const resizeCommandBtn = createCommandButton(
    'reSize Grid', 
    'resizeCommandButton',
    () => {
        let newSize = promptForSize();
        
        if (newSize) {
    createGrid(newSize);
    console.log(`User entered a new size: ${newSize}`);

    } 

    });

const resetCommandBtn = createCommandButton(
    'reSet Grid',
    'resetCommandButton',
    () =>{
        createGrid(16);
    });

 commandCenter.appendChild(resizeCommandBtn);
 console.log("reSize Grid Button created successfully.")
 commandCenter.appendChild(resetCommandBtn);
 ;console.log("reSet Grid Button created successfully.")


 
    // listens for hover and adds CSS tag
    gridContainer.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('grid-square')) {
            e.target.classList.add('hovered');
            
            e.target.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.2)";
        }
    });

    // Reset shadow on mouse leave
    gridContainer.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('grid-square')) {
            e.target.style.boxShadow = "";
        }
    });

    function promptForSize() {
        let size;
        while (true) {
            const input = prompt("Enter the number of squares per side (max 100):");

            if (input === null) {
                console.log("Resize operation canceled.");
                return null;
            }

            size = parseInt(input, 10);

            if (size > 0 && size <= 100) {
                console.log(`User entered a new size: ${size}`);
                return size;
            } else {
                alert("Please enter a number between 1 and 100.");
            }
        }
    }

    function createGrid(size) {
        console.log(`Creating a new grid of size ${size}x${size}...`);
        
        // Clear existing grid squares
        gridContainer.innerHTML = '';
        
        // Calculate the square size for Flexbox
        const squareSizePercentage = 100 / size;
        
        // Use a DocumentFragment for performance with large grids
        const fragment = document.createDocumentFragment();
        
        const totalSquares = size * size;
        for (let i = 0; i < totalSquares; i++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.style.flexBasis = `${squareSizePercentage}%`;
            fragment.appendChild(gridSquare);
        }
        
        gridContainer.appendChild(fragment);
        console.log("Grid created successfully.");
    }
});