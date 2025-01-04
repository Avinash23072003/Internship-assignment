// Part B: Draggable and Resizable Circle
const circle = document.getElementById('circle');
const container = document.querySelector('.circle-container');

let isDragging = false;
let isResizing = false;
let startX, startY, startDiameter;

// Helper function to get event coordinates
function getEventCoords(event) {
  if (event.touches && event.touches.length > 0) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }
  return { x: event.clientX, y: event.clientY };
}

// Start drag or resize
function startInteraction(event) {
  const { x, y } = getEventCoords(event);

  if (event.shiftKey) {
    // Start resizing
    isResizing = true;
    startDiameter = circle.offsetWidth;
    startX = x;
  } else {
    // Start dragging
    isDragging = true;
    startX = x - circle.offsetLeft;
    startY = y - circle.offsetTop;
  }

  event.preventDefault();
}

// Dragging or resizing
function moveInteraction(event) {
  const { x, y } = getEventCoords(event);

  if (isDragging) {
    // Dragging logic
    let newX = x - startX;
    let newY = y - startY;

    // Constrain movement within the container
    newX = Math.max(0, Math.min(container.offsetWidth - circle.offsetWidth, newX));
    newY = Math.max(0, Math.min(container.offsetHeight - circle.offsetHeight, newY));

    circle.style.left = `${newX}px`;
    circle.style.top = `${newY}px`;
  } else if (isResizing) {
    // Resizing logic
    const newDiameter = Math.max(20, startDiameter + (x - startX));
    circle.style.width = `${newDiameter}px`;
    circle.style.height = `${newDiameter}px`;
  }
}

// Stop drag or resize
function stopInteraction() {
  isDragging = false;
  isResizing = false;
}

// Event listeners for mouse and touch events
circle.addEventListener('mousedown', startInteraction);
circle.addEventListener('touchstart', startInteraction, { passive: false });

document.addEventListener('mousemove', moveInteraction);
document.addEventListener('touchmove', moveInteraction, { passive: false });

document.addEventListener('mouseup', stopInteraction);
document.addEventListener('touchend', stopInteraction);
