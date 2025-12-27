const container = document.querySelector("#container");
const submitBtn = document.querySelector("#submitBtn");
const defaultBtn = document.querySelector("#default");
const rgbBtn = document.querySelector("#rgb");
const shadeBtn = document.querySelector("#shade");
const eraser = document.querySelector("#eraser");
const gridSize = 960;
let isMouseDown = false;
let defaultColor = true;
let rgbColor = false;
let shadeColor = false;
let opacity = "0";

document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

// Initialize the first grid with a 16 x 16 layout
container.setAttribute(`style`, `height: ${gridSize}px; width: ${gridSize}px; justify-content: center;`);
makeGrid(16);

// Gets the custom grid size if the user wants to add their own parameters
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Get the value from the input
  let userChoice = document.getElementById("gridSize").value;
  document.getElementById("gridSize").value = "";

  // Conditional to keep grid 100 x 100 and under
  if (userChoice > 100) {
    alert("Please select a size between 1 and 100");
    return;
  };

  // This deletes the current Grid and makes a new one with new parameters
  container.replaceChildren();
  makeGrid(userChoice);
});



// Resets all the blocks back to white
eraser.addEventListener("click", () => {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach(block => {
    block.style.backgroundColor = "white";
  });
});

defaultBtn.addEventListener("click", () => {
  defaultColor = true;
  rgbColor = false;
  shadeColor = false;
});

rgbBtn.addEventListener("click", () => {
  defaultColor = false;
  rgbColor = true;
  shadeColor = false;
})

shadeBtn.addEventListener("click", () => {
  defaultColor = false;
  rgbColor = false;
  shadeColor = true;
})


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
      const newBlock = document.createElement("div");
      newBlock.classList.add("block");
      newBlock.dataset.opacity = 0;
      newBlock.setAttribute(`style`, `height: ${blockSize}px; width: ${blockSize}px; outline: 1px solid #8f8f8f; outline-offset: -1px;`);
      container.appendChild(newBlock);

      newBlock.addEventListener("mousemove", () => {
        if (!isMouseDown) return;

        else {
          if (defaultColor) {
            newBlock.style.backgroundColor = "black";
          }
          else if (rgbColor) {
            const getRandomColor = () => {
                return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0"); // Gets a random number between 0x000000 and 0xFFFFFF
            }
            newBlock.style.backgroundColor = getRandomColor();
          }
          else if (shadeColor) {
            let currentOpacity = Number(newBlock.dataset.opacity);

            if (currentOpacity < 1) {
              currentOpacity += 0.1;
              newBlock.dataset.opacity = currentOpacity;
            }

            newBlock.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
          };
        };
      });
    };
  };
};
