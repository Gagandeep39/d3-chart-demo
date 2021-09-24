import * as d3 from 'https://cdn.skypack.dev/d3@7';

// let data = [
//   { name: 'Product Revenue', value: 42000, class: 'positive' },
//   { name: 'Services Revenue', value: 21000, class: 'positive' },
//   { name: 'Fixed Costs', value: 17000, class: 'negative' },
//   { name: 'Variable Costs', value: 14000, class: 'negative' },
// ];

let data = [
  {
    name: 'Estimation without GreenStruxure* ($ 105.5k)',
    value: 105000,
    class: 'positive',
  },
  {
    name: '',
    value: 0,
    class: 'placeholder',
  },
  {
    name: 'DC costs reduction* ($ 17.5k) ddfdfdf sdsdsdsd',
    value: 17000,
    class: 'negative',
  },
  {
    name: '',
    value: 0,
    class: 'placeholder',
  },
  {
    name: 'Energy costs reduction* ($ 41.6k)',
    value: 41000,
    class: 'negative',
  },
  {
    name: '',
    value: 0,
    class: 'placeholder',
  },
  {
    name: 'Estimation without GreenStruxure* ($ 10',
    value: 22000,
    class: 'positive',
  },
  {
    name: '',
    value: 0,
    class: 'placeholder',
  },
  {
    name: 'Estimation without GreenStruxure* ($ 105.5k',
    value: 9000,
    class: 'positive',
  },
  {
    name: '',
    value: 0,
    class: 'placeholder',
  },
  {
    name: 'Estimation without($ 105.5k)',
    value: 2000,
    class: 'positive',
  },
  {
    name: '',
    value: 0,
    class: 'placeholder',
  },
  {
    name: 'without GreenStruxssdsdure* ($ 105.5k)',
    value: 80000,
    class: 'total',
  },
];

let cumulative = 0;
for (let i = 0; i < data.length; i++) {
  data[i].start = cumulative;
  if (data[i].class === 'positive') cumulative += data[i].value;
  else cumulative -= data[i].value;
  data[i].end = cumulative;
}

data = data.map((d) => {
  if (d.start < 0) {
    d.start = d.start * -1;
  }
  if (d.end < 0) {
    d.end = d.end * -1;
  }
  return d;
});

// for (let index = 0; index < data.length; index++) {
//   const element =
// }

console.log(data);
var width = '100%';
var height = 300;
var chart = d3
  .select('.graph')
  .style('position', 'relative')
  .style('max-width', '600px')
  .style('display', 'flex')
  .style('justify-content', 'space-between')
  .attr('width', width + 'px')
  .style('width', width)
  .attr('height', height + 'px');
// .append('g');
// Scale
// let x = d3.scaleBand().range([0, 600]).padding(0.4);

let y = d3.scaleLinear().range([height, 0]);

// x.domain(
//   data.map(function (d) {
//     return d.name;
//   })
// );
y.domain([
  0,
  d3.max(data, function (d) {
    return d.end;
  }),
]);

var bar = chart.selectAll('.bar').data(data);

bar
  .enter()
  .append('div')
  .attr('style', 'display: inline-block;')

  .style('width', (d) => {
    if (d.class === 'placeholder') {
      return '20px';
    }
    return '50px';
  })
  .attr('class', (d) => d.class)
  .style('height', (d) => {
    // if (d.class === 'placeholder') {
    //   return '100%';
    // }
    return Math.abs(y(d.start) - y(d.end)) + 'px';
  })
  .style('background-color', function (d, i) {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  })
  .style('transform', (d) => `translate(0, ${y(Math.max(d.start, d.end))}px)`)
  // .style('flex-basis', (d) => {
  //   console.log(d.class);
  //   return d.class === 'placeholder' ? '50%' : '100%';
  // })
  .style('flex-shrink', (d) => {
    console.log(d.class);
    return d.class === 'placeholder' ? '3' : '1';
  })
  .style('flex-grow', (d) => {
    console.log(d.class);
    return d.class === 'placeholder' ? '1' : '0';
  })
  // .style('margin-top', (d) => y(Math.max(d.start, d.end)) + 'px')
  // .style('margin-left', '20px')
  .on('click', (d) => {
    console.log(d);
  });

// Connector
// bar
//   .enter()
//   .append('div')
//   .style('display', 'inline-block')
//   .style('position', 'absolute')
//   .style('height', '1px')
//   .style('background-color', 'black')
//   .style('left', (d) => {
//     return x(d.name) + 'px';
//   })
//   .style('width', (d) =>
//     d.class === 'total' ? 0 : x.bandwidth() * 2 + x.padding() * x.step() + 'px'
//   )
//   .style('top', (d) =>
//     d.class === 'positive'
//       ? y(Math.max(d.start, d.end)) + 'px'
//       : y(Math.max(d.start, d.end)) + Math.abs(y(d.start) - y(d.end)) + 'px'
//   );

// // Add label
// bar
//   .enter()
//   .append('span')
//   .attr('style', 'position: absolute;display: block;white-space: pre-line;')
//   .style('left', (d) => {
//     return x(d.name) + 'px';
//   })
//   .style('top', (d) => {
//     if (d.class === 'negative') {
//       return y(d.end) + 'px';
//     }
//     return y(Math.max(d.start, d.end)) + 'px';
//   })
//   .style('width', () => x.bandwidth() * 2 + 'px')
//   .style('transform', (d) => {
//     if (d.class === 'positive' || d.class === 'total') {
//       return `translate(-${x.bandwidth() / 2 + 'px'}, -100%)`;
//     } else {
//       return `translate(-${x.bandwidth() / 2 + 'px'}, 0)`;
//     }
//   })
//   .style('word-break', 'break-all')
//   .text((d) => d.name)
//   .style('text-align', 'center');

// Connectio

// bar
//   .enter()
//   .append('div')
//   .attr('style', 'display: inline-block;')
//   .style('width', '100%')
//   .style('height', '1px')
//   .style('background-color', 'black');
let a = chart
  .append('div')
  .style('width', '100%')
  .style('height', '100%')
  .style('position', 'absolute')
  .style('display', 'flex')
  .style('justify-content', 'space-between')
  .style('backgroud-color', 'green')
  .style('top', 0)
  .style('left', 0)
  .selectAll('.line-item')
  .data(data);
a.enter()
  .append('div')
  .style('width', '100%')
  .style('height', '1px')
  .style('background-color', 'black')
  .style('transform', (d) => `translate(0px, ${y(Math.max(d.start, d.end))}px)`)
  .style('flex-shrink', (d) => {
    console.log(d.class);
    return d.class === 'placeholder' ? '3' : '1';
  })
  .style('width', (d) => {
    if (d.class === 'placeholder') {
      return '20px';
    }
    return '50px';
  })
  .style('flex-grow', (d) => {
    console.log(d.class);
    return d.class === 'placeholder' ? '1' : '0';
  });
// var bar = chart.selectAll('.bar').data(data);
console.log(a);
