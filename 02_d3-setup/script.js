import * as d3 from 'https://cdn.skypack.dev/d3@7';

const canvas = d3.select('.canvas');
const svg = canvas.append('svg');
svg.attr('width', 600);
svg.attr('height', 600);
// svg.attr('fill', 'gray'); // Doesnt work, Can only be used on element isnie svf
svg.style('background-color', '#f0f0f0');

// Create and append to rect
// const rect = svg.append('rect');
// rect.append('circle');

// Append shapes to svg conainer
// svg
//   .append('rect')
//   .attr('width', 200)
//   .attr('height', 100)
//   .attr('fill', 'blue')
//   .attr('x', 20)
//   .attr('y', 20);

// svg
//   .append('circle')
//   .attr('r', 50)
//   .attr('cx', 300)
//   .attr('cy', 70)
//   .attr('fill', 'pink');
// svg
//   .append('line')
//   .attr('x1', 370)
//   .attr('x2', 400)
//   .attr('y1', 20)
//   .attr('y2', 120)
//   .attr('stroke', 'red');

// svg
//   .append('text')
//   .attr('x', 20)
//   .attr('y', 200)
//   .text('Hello World')
//   .attr('fill', 'gray')
//   .style('font-size', '20px');

// Mehod changing
// Adds attribut to previously returned value
// rect.attr('width', 100).attr('height', 100).attr('fill', 'red'); will create a rect with height and width and color in  a single line

// Groups

// Create multiple eement inside a single elemnt
const group = svg.append('g').attr('transform', 'translate(50, 100)');

group
  .append('rect')
  .attr('width', 200)
  .attr('height', 100)
  .attr('fill', 'blue')
  .attr('x', 20)
  .attr('y', 20);

group
  .append('circle')
  .attr('r', 50)
  .attr('cx', 300)
  .attr('cy', 70)
  .attr('fill', 'pink');
group
  .append('line')
  .attr('x1', 370)
  .attr('x2', 400)
  .attr('y1', 20)
  .attr('y2', 120)
  .attr('stroke', 'red');

group
  .append('text')
  .attr('x', 20)
  .attr('y', 200)
  .text('Hello World')
  .attr('fill', 'gray')
  .style('font-size', '20px');
