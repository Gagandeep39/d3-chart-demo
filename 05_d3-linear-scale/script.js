import * as d3 from 'https://cdn.skypack.dev/d3@7';

const svg = d3.select('svg');
d3.json('05_d3-linear-scale/menu.json').then((data) => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)])
    .range([0, 600]);

  const x = d3
    .scaleBand()
    .domain(data.map((i) => i.name))
    .range([0, 600])
    .paddingInner(0.3)
    .paddingOuter(0.1);

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
    .attr('height', (d) => y(d.orders))
    .attr('width', (d) => x.bandwidth())
    .attr('x', (d, i) => x(d.name));
});
