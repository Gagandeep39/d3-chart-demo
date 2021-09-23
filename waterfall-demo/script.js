import * as d3 from 'https://cdn.skypack.dev/d3@7';

let data = [
  { name: 'Product Revenue', value: 42000 },
  { name: 'Services Revenue', value: 21000 },
  { name: 'Fixed Costs', value: -17000 },
  { name: 'Variable Costs', value: -14000 },
];

let cumulative = 0;
for (let i = 0; i < data.length; i++) {
  data[i].start = cumulative;
  cumulative += data[i].value;
  data[i].end = cumulative;

  data[i].class = data[i].value >= 0 ? 'positive' : 'negative';
}
data.push({
  name: 'Total',
  end: cumulative,
  start: 0,
  class: 'total',
});

data = data.map((d) => {
  if (d.start < 0) {
    d.start = d.start * -1;
  }
  if (d.end < 0) {
    d.end = d.end * -1;
  }
  return d;
});
var width = 600;
var height = 300;
var chart = d3
  .select('.graph')
  .attr('width', width)
  .attr('height', height)
  .append('g');
// Scale
let x = d3.scaleBand().range([0, width]);

let y = d3.scaleLinear().range([height, 0]);

x.domain(
  data.map(function (d) {
    return d.name;
  })
);
y.domain([
  0,
  d3.max(data, function (d) {
    return d.end;
  }),
]);

var bar = chart
  .selectAll('.bar')
  .data(data)
  .enter()
  .append('g')
  .attr('class', function (d) {
    return 'bar ' + d.class;
  })
  .attr('transform', function (d) {
    return 'translate(' + x(d.name) + ',0)';
  });

bar
  .append('rect')
  .attr('y', function (d) {
    return y(Math.max(d.start, d.end));
  })
  .attr('height', function (d) {
    return Math.abs(y(d.start) - y(d.end));
  })
  .attr('width', x.bandwidth);
