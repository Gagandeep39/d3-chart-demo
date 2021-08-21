import * as d3 from 'https://cdn.skypack.dev/d3@7';

const data = [
  { width: 200, height: 100, fill: 'purple' },
  { width: 100, height: 60, fill: 'pink' },
];
const svg = d3.select('svg');

const rec = svg
  .selectAll('rect')
  .data(data)
  .attr('width', function (d, i, n) {
    // d - Data
    // i - Index
    // n - Node (All Eleemnts), Allows acces to node , helpful in arrow function where this keyword doesnt give curren element
    return d.width;
  })
  .attr('height', (d) => d.height)
  .attr('fill', (d) => d.fill);

// Data function Maps data with seleced element
// First item in data array is mapped with first element insde select array

// Enter
// Creates element based on number of items in data array
// It uses if element already exists (Elements found using select()), or else it creates new elemnt
// Eg. .enter().appent('rect')
// Here we are specifying that we jve to create new rect element to map the remainin data

rec
  .enter()
  .append('rect')
  .attr('width', (d, i, n) => d.width)
  .attr('height', (d) => d.height)
  .attr('fill', (d) => d.fill);

// Mehod separately written, as previous methid will only add styliing to existing elements
//  To overcome this issue, its better to have 0 elements present in the start
