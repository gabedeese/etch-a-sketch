const container = document.querySelector("#container");
const gridSize = 960;

// Initialize the first grid with a 16 x 16 layout
container.setAttribute(`style`, `height: ${gridSize}px; width: ${gridSize}px; justify-content: center;`);
makeGrid(16);

// Make a grid (n x n) the size of what the user inputs
function makeGrid(userChoice) {

  // Need to get the size of each block in the grid
  const blockSize = Math.round(gridSize / userChoice);

  // Round the number to the nearest integer and change the size of the grid accordingly
  // If this is not in here then sometimes gS/uC can equal a long float value and the blocks won't fill the grid completely
  let newGridSize = blockSize * userChoice;
  container.setAttribute(`style`, `height: ${newGridSize}px; width: ${newGridSize}px;`);

  // Nested for loop to fill out grid row by row
  for (let i = 0; i < userChoice; i++) {
    for (let j = 0; j < userChoice; j++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.setAttribute(`style`, `height: ${blockSize}px; width: ${blockSize}px; border: 1px solid #8f8f8f;`);
      container.appendChild(block);
    }
  }
}

// Gets the custom grid size if the user wants to add their own parameters
const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", () => {
  // Get the value from the input
  const userChoice = document.getElementById("gridSize").value;
  console.log(userChoice);

  // Conditional to keep grid 100 x 100 and under
  if (userChoice > 100) {
    alert("Please select a size between 1 and 100");
    return;
  }

  // This deletes the current Grid and makes a new one with new parameters
  container.replaceChildren();
  makeGrid(userChoice);
})
