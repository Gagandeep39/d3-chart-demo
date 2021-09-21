import * as d3 from 'https://cdn.skypack.dev/d3@7';

const items = document.querySelectorAll('.item');

// reset width of all item to 5%
function resetWidth() {
  items.forEach((item) => {
    item.style.width = '5%';
  });
}

items.forEach((item) => {
  // Apply Click listener
  item.addEventListener('click', (e) => {
    console.log(item.style.width);
    if (item.style.width === '50%') {
      item.style.width = '5%';
      return;
    } else {
      resetWidth();
      item.style.width = 50 + '%';
    }
  });
});

const y = d3.scaleLinear().range([0, 200]);
y.domain([0, 100]);

const data = [
  { actual: 70, predicted: 6 },
  { actual: 12, predicted: 5 },
  { actual: 2, predicted: 4 },
  { actual: 1, predicted: 40 },
  { actual: 0, predicted: 0 },
  { actual: 70, predicted: 6 },
  { actual: 12, predicted: 5 },
  { actual: 70, predicted: 6 },
];

console.log(d3.selectAll('.item').data(data));
d3.selectAll('.actual')
  .data(data)
  .attr('style', (d, e) => {
    return 'height: ' + y(d.actual) + 'px; width: 100%';
  });
d3.selectAll('.predicted')
  .data(data)
  .attr('style', (d, e) => {
    return 'height: ' + y(d.predicted) + 'px; width: 100%;';
  });
