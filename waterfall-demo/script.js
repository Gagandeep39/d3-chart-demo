import * as d3 from 'https://cdn.skypack.dev/d3@7';

let data = [
  { name: 'Product Revenue', value: 42000, class: 'positive' },
  { name: 'Services Revenue', value: 21000, class: 'positive' },
  { name: 'Fixed Costs', value: 17000, class: 'negative' },
  { name: 'Variable Costs', value: 14000, class: 'negative' },
];

let cumulative = 0;
for (let i = 0; i < data.length; i++) {
  data[i].start = cumulative;
  if (data[i].class === 'positive') cumulative += data[i].value;
  else cumulative -= data[i].value;
  data[i].end = cumulative;
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

console.log(data);
var width = 600;
var height = 300;
var chart = d3
  .select('.graph')
  .style('position', 'relative')
  .attr('width', width + 'px')
  .attr('height', height + 'px');
// .append('g');
// Scale
let x = d3.scaleBand().range([0, width]).padding(0.4);

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

var bar = chart.selectAll('.bar').data(data);
// .enter()
// .append('g')
// .attr('class', function (d) {
//   return 'bar ' + d.class;
// })
// .attr('transform', function (d) {
//   return 'translate(' + x(d.name) + ',0)';
// });

bar
  .enter()
  .append('div')
  .attr('style', 'display: inline-block; position: absolute')
  .attr('y', function (d) {
    return y(Math.max(d.start, d.end));
  })
  .style('top', (d) => {
    return y(Math.max(d.start, d.end)) + 'px';
  })
  .attr('height', function (d) {
    return Math.abs(y(d.start) - y(d.end)) + 'px';
  })
  .attr('width', () => {
    return x.bandwidth() + 'px';
  })
  .style('width', () => {
    return x.bandwidth() + 'px';
  })
  .style('background-color', function (d, i) {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  })
  .style('outline', '1px solid black')
  .style('outline', '1px solid black')
  .style('height', (d) => {
    return Math.abs(y(d.start) - y(d.end)) + 'px';
  })
  .style('transform', (d) => {
    console.log(x(d.name));
    return 'translate(' + x(d.name) + 'px,0px)';
  })
  .style('z-index', () => 10)
  .attr('class', (d, i) => i)
  .on('click', (d) => {
    console.log(d);
  });
// console.log(bar);

// console.log(bar.selectAll('.bar'));
// Draw line for connecting each bar
console.log(bar.enter());
bar
  .enter()
  .append('svg')
  // .enter()
  .append('line')
  .attr('x1', (d) => x(d.name))
  .attr('y1', (d, i) => {
    console.log(data[i].class, data[i + 1]?.class);
    if (data[i].class === 'negative' && data[i + 1]?.class === 'negative') {
      console.log(i);
      return y(Math.max(d.start, d.end)) + Math.abs(y(d.start) - y(d.end));
    } else if (data[i].class === 'negative' && data[i + 1]?.class === 'total') {
      return y(Math.max(d.start, d.end)) + Math.abs(y(d.start) - y(d.end));
    }

    return y(Math.max(d.start, d.end));
  })
  .attr('x2', (d, i) => {
    return data[i + 1]
      ? x(data[i + 1].name) + x.bandwidth()
      : x(d.name) + x.bandwidth();
  })
  .attr('y2', (d, i) => {
    if (data && data[i + 1]) {
      if (data[i + 1].class === 'positive' && data[i].class === 'positive') {
        return (
          y(Math.max(data[i + 1].start, data[i + 1].end)) +
          Math.abs(y(data[i + 1].start) - y(data[i + 1].end))
        );
      } else if (
        data[i + 1].class === 'negative' &&
        data[i].class === 'positive'
      ) {
        return y(Math.max(data[i + 1].start, data[i + 1].end));
      } else if (
        data[i + 1].class === 'negative' &&
        data[i].class === 'negative'
      ) {
        return y(Math.max(data[i + 1].start, data[i + 1].end));
      } else if (
        data[i].class === 'negative' &&
        data[i + 1]?.class === 'total'
      ) {
        return y(Math.max(data[i + 1].start, data[i + 1].end));
      }
    } else return y(Math.max(d.start, d.end));
  })
  .attr('stroke', 'black');
