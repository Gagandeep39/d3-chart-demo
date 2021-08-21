import * as d3 from 'https://cdn.skypack.dev/d3@7';

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

// Create margins
const margin = {
  top: 20,
  right: 20,

  bottom: 100,
  left: 100,
};

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph.append('g');

const yAxisGroup = graph.append('g');

d3.json('05_d3-linear-scale/menu.json').then((data) => {
  const min = d3.min(data, (d) => d.orders); // Find min
  const max = d3.max(data, (d) => d.orders); // Find max
  const extent = d3.extent(data, (d) => d.orders); // FInds min, max

  const y = d3.scaleLinear().domain([0, max]).range([0, graphHeight]);

  const x = d3
    .scaleBand()
    .domain(data.map((i) => i.name))
    .range([0, graphWidth])
    .paddingInner(0.3)
    .paddingOuter(0.1);

  const rects = graph.selectAll('rect').data(data);

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
    .attr('height', (d) => y(d.orders))
    .attr('width', x.bandwidth)
    .attr('x', (d, i) => x(d.name));

  // Create and call axis
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
});
