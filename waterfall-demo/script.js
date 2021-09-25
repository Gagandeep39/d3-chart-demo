import * as d3 from 'https://cdn.skypack.dev/d3@7';

let data = [
  {
    name: 'Estimation without GreenStruxure* ($ 105.5k)',
    value: 105000,
    class: 'positive',
  },
  {
    name: 'DC costs reduction* ($ 17.5k) ddfdfdf sdsdsdsd',
    value: 17000,
    class: 'negative',
  },
  {
    name: 'Energy costs reduction* ($ 41.6k)',
    value: 41000,
    class: 'negative',
  },
  {
    name: 'Estimation without GreenStruxure* ($ 10',
    value: 22000,
    class: 'positive',
  },
  {
    name: 'Estimation without GreenStruxure* ($ 105.5k',
    value: 9000,
    class: 'positive',
  },
  {
    name: 'Estimation without($ 105.5k)',
    value: 2000,
    class: 'positive',
  },
  {
    name: 'without GreenStruxssdsdure* ($ 105.5k)',
    value: 80000,
    class: 'total',
  },
];

let modifiedData = [];

data.forEach((ch, idx) => {
  modifiedData.push(ch);
  console.log(idx);
  if (idx === data.length - 1) return;
  modifiedData.push({
    name: '',
    value: 0,
    class: 'placeholder',
  });
});
data = [...modifiedData];

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

console.log(data);
var width = '100%';
var height = 300;
var chart = d3
  .select('.graph')
  .style('position', 'relative')
  .style('display', 'flex')
  .style('justify-content', 'space-between')
  .attr('width', width + 'px')
  .style('width', width)
  .attr('height', height + 'px');

let y = d3.scaleLinear().range([height, 0]);

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
  .style('z-index', 1)
  .style('border-bottom', (d) =>
    d.class !== 'placeholder' ? '1px solid black' : ''
  )

  .style('width', (d) => {
    if (d.class === 'placeholder') {
      return '20px';
    }
    return '50px';
  })
  .attr('class', (d) => d.class)
  .style('height', (d) => {
    return Math.abs(y(d.start) - y(d.end)) + 'px';
  })
  .style('background-color', function (d, i) {
    if (d.class === 'placeholder') return '';
    return '#' + Math.random().toString(16).slice(-6);
  })
  .style('transform', (d) => `translate(0, ${y(Math.max(d.start, d.end))}px)`)

  .style('flex-shrink', (d) => {
    return d.class === 'placeholder' ? '3' : '1';
  })
  .style('flex-grow', (d) => {
    return d.class === 'placeholder' ? '1' : '0';
  })
  .append('span')
  .style('position', 'absolute')

  .style('left', '50%')
  .text((d) => d.name)
  .style('text-align', 'center')
  .style('bottom', (d) => (d.class === 'negative' ? '0' : 'unset'))
  .style('top', (d) => {
    console.log(data[0].start - data[data.length - 1].start);
    if (d.class !== 'total') return 0 + 'px';
    else return -y(Math.max(d.start, d.end)) + 'px';
  })
  .style('transform', (d) => {
    if (d.class === 'negative') return 'translate(-50%, 100%)';
    return 'translate(-50%, -100%)';
  });

let a = chart
  .append('div')
  .style('width', '100%')
  .style('height', '100%')
  .style('position', 'absolute')
  .style('display', 'flex')
  .style('justify-content', 'space-between')
  .style('top', 0)
  .style('left', 0)
  .selectAll('.line-item')
  .data(data);
a.enter()
  .append('div')
  .style('width', '100%')
  .style('height', '1px')
  .style('background-color', 'black')
  .style(
    'transform',
    (d) => `translate(0px, calc(${y(Math.max(d.start, d.end))}px - 100%))`
  )
  .style('flex-shrink', (d) => {
    console.log(d.class);
    return d.class === 'placeholder' ? '3' : '1';
  })
  .style('box-sizing', 'border-box')
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

// console.log();
chart
  .selectAll('.total')
  .style('position', 'relative')
  .append('div')
  .style('width', '1px')
  .style('height', () => {
    return Math.abs(y(data[0].start) - y(data[0].end)) + 'px';
  })
  .style('position', 'absolute')
  .style('bottom', 0)
  .style('left', '50%')
  .style('opacity', '0.5')
  .attr('class', 'abc')
  .style('background-color', 'red');
