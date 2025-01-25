function setupMasonryLayout() {
  const section = document.getElementById('questionSection');
  const items = Array.from(section.children);

  // Determine the number of columns based on window width (e.g., 1 column for small screens)
  const numColumns = window.innerWidth < 550 ? 1 : 2;

  // Gap between columns and rows
  const columnGap = 20;

  // Calculate column width dynamically based on the container width
  const totalWidth = section.offsetWidth;
  const columnWidth = (totalWidth - (columnGap * (numColumns - 1))) / numColumns;

  // Initialize an array to track column heights
  let columnHeights = new Array(numColumns).fill(0);

  // Reset styles for all items before recalculating
  items.forEach((item) => {
      item.style.position = '';
      item.style.top = '';
      item.style.left = '';
      item.style.width = '';
  });

  // Position each item
  items.forEach((item) => {
      // Find the column with the smallest height
      const minIndex = columnHeights.indexOf(Math.min(...columnHeights));

      // Position the item in the appropriate column
      item.style.position = 'absolute';
      item.style.width = `${columnWidth}px`; // Consistent width
      item.style.top = `${columnHeights[minIndex]}px`;
      item.style.left = `${minIndex * (columnWidth + columnGap)}px`;

      // Update the column height
      columnHeights[minIndex] += item.offsetHeight + columnGap;
  });

  // Set the container height to match the tallest column
  section.style.height = `${Math.max(...columnHeights)}px`;
}

// Run the layout function on initial load
window.addEventListener('load', setupMasonryLayout);

// Recalculate the layout whenever the window is resized
window.addEventListener('resize', setupMasonryLayout);
