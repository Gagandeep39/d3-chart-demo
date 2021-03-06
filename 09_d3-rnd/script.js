import * as d3 from 'https://cdn.skypack.dev/d3@7';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA-fSMTaEMpolwMgHKZgAQJQk9Qi3NeYxI',
  authDomain: 'flutter-intro-setup-gagan.firebaseapp.com',
  databaseURL: 'https://flutter-intro-setup-gagan.firebaseio.com',
  projectId: 'flutter-intro-setup-gagan',
  storageBucket: 'flutter-intro-setup-gagan.appspot.com',
  messagingSenderId: '321214862687',
  appId: '1:321214862687:web:74d01a53c0b9f1a9b5d2ea',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// Fixes a date related issue
db.settings({ timestampsInSnapshots: true, merge: true });

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

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append('g');

// Scales
const y = d3.scaleLinear().range([graphHeight, 0]);

const x = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.3)
  .paddingOuter(0.1);

// Create and call axis
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y).ticks(2);

xAxisGroup
  .selectAll('text')
  .style('transform', 'rotate(-40deg)') // Rotate label
  .attr('text-anchor', 'end'); // Origin on rotation to end of text

// const t = d3.transition().duration(500);

const update = (data) => {
  console.log(data);
  // 1. Update the Scale
  x.domain(data.map((i) => i.name));
  y.domain([0, d3.max(data, (d) => d.orders)]);

  // 2. Join the elements to data using `const rec = selectAll().data()`
  const rects = graph.selectAll('rect').data(data);
  // 3. Remov unwanted eleents using `rec.exit().remove();
  rects.exit().remove();
  // 4. Update Current Shapes using `rects.attr(...etc)`
  rects
    .attr('fill', 'orange')
    .attr('x', (d, i) => x(d.name))
    .attr('width', 0)
    .style('cursor', 'pointer');
  // 5. Append the new data using `rec.enter().append('rect').attr(...etc)`
  rects
    .enter()
    .append('rect')
    .attr('fill', 'orange')
    .attr('width', (d, i) => {
      console.log(i);
      if (i === 2) return '200px';
      else return x.bandwidth();
    })
    .attr('height', 0) // Start Condition
    .attr('y', graphHeight)
    .attr('x', (d, i) => x(d.name))
    .style('cursor', 'pointer')
    .on('click', function (event, data) {
      // // console.log(event, data);
      // console.log(rects.enter());
      // d3.selectAll('rect').attr('width', '20px');
      // // rects.enter().attr('fill', 'red');
      // d3.select(this).attr('width', '200px');
      // xAxisGroup.call(xAxis);
    })
    .merge(rects)
    .transition()
    // .attrTween('width', widthTeen)
    .attr('height', (d) => graphHeight - y(d.orders)) // End Condition
    .attr('y', (d) => y(d.orders));

  // Update the axis aain after scale is updated
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

let data = [];
// Fetc Data
db.collection('dishes').onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };
    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex((d) => d.id === doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter((d) => d.id !== doc.id);
        break;
      default:
        break;
    }
  });
  update(data);
});

const widthTeen = (d) => {
  let i = d3.interpolate(0, x.bandwidth());

  return function (t) {
    return i(t);
  };
};

// Crete starting condition
// . Specfiy Starting oint in Y o.e
// Y = graphHeight
// Height = 0
// Create Enditing COndition (Usually the values we set when we dont add any transition)
// Y = y(d.orders)
// Height = graphHeight - y(d.orders)
// Must be added inside .entre() as we have to show them when its created
