import * as d3 from 'https://cdn.skypack.dev/d3@7';

const svg = d3.select('svg');
d3.json('04_d3-external-data/planets.json').then((data) => {
  const circles = svg.selectAll('circle').data(data);

  // Append Circles with styling to dom
  circles
    .enter()
    .append('circle')
    .attr('cx', (d) => d.distance)
    .attr('cy', 200)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fill);
});
