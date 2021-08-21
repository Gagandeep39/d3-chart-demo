import * as d3 from 'https://cdn.skypack.dev/d3@7';

const svg = d3.select('svg');
d3.json('04_d3-linear-scale/menu.json').then((data) => {
  const rects = svg.selectAll('rect').data(data);

  // Style Already existsting rects [CAN B REMOVED]
  rects
    .attr('fill', 'orange')
    .attr('height', (d) => d.orders)
    .attr('width', 50)
    .attr('x', (d, i) => i * 70);

  // Styling newly generated Elements
  rects
    .enter()
    .append('rect')
    .attr('fill', 'orange')
    .attr('height', (d) => d.orders)
    .attr('width', 50)
    .attr('x', (d, i) => i * 70);
});
