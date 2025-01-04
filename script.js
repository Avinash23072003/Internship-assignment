// Part A: Rectangle rotation and color change
const rectangle = document.getElementById('rectangle');
const rotateSlider = document.getElementById('rotate-slider');
const colorPicker = document.getElementById('color-picker');

rotateSlider.addEventListener('input', (e) => {
  rectangle.style.transform = `rotate(${e.target.value}deg)`;
});

colorPicker.addEventListener('input', (e) => {
  rectangle.style.backgroundColor = e.target.value;
});

// Part B: Draggable and Resizable Circle
const circle = document.getElementById('circle');
const container = document.querySelector('.circle-container');

let isDragging = false;
let isResizing = false;
let startX, startY, startDiameter;

// Dragging the circle
circle.addEventListener('mousedown', (e) => {
  if (e.shiftKey) {
    // Start resizing
    isResizing = true;
    startDiameter = circle.offsetWidth;
    startX = e.clientX;
    startY = e.clientY;
  } else {
    // Start dragging
    isDragging = true;
    startX = e.clientX - circle.offsetLeft;
    startY = e.clientY - circle.offsetTop;
  }
  e.preventDefault();
});

// Handle mouse movement for dragging and resizing
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    // Calculate new position
    let x = e.clientX - startX;
    let y = e.clientY - startY;

    // Constrain movement within the container
    x = Math.max(0, Math.min(container.offsetWidth - circle.offsetWidth, x));
    y = Math.max(0, Math.min(container.offsetHeight - circle.offsetHeight, y));

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
  } else if (isResizing) {
    // Calculate new diameter
    const newDiameter = Math.max(20, startDiameter + (e.clientX - startX));
    circle.style.width = `${newDiameter}px`;
    circle.style.height = `${newDiameter}px`;
  }
});

// Stop dragging or resizing on mouseup
document.addEventListener('mouseup', () => {
  isDragging = false;
  isResizing = false;
});
