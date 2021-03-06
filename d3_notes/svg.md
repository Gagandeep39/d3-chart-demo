# SVG

- [SVG](#svg)
  - [Description](#description)
  - [Complex Shapes](#complex-shapes)
  - [Method Chaining](#method-chaining)
  - [Importnat mmethods](#importnat-mmethods)
  - [Groups](#groups)
  - [Data](#data)
  - [Enter Selection](#enter-selection)
  - [Selection in Detail (Enter, Exit, Group)](#selection-in-detail-enter-exit-group)
  - [Linear Scale](#linear-scale)
  - [Band Scale](#band-scale)
  - [Min, Max, Extent](#min-max-extent)
  - [Axis](#axis)
  - [INverting Axis](#inverting-axis)
  - [Ticks](#ticks)
  - [Over all procedure to create Chart](#over-all-procedure-to-create-chart)
  - [Transition](#transition)
    - [Transition Bar chart](#transition-bar-chart)
    - [Merge](#merge)
  - [Steps to Update a chart](#steps-to-update-a-chart)

## Description

- Scalabale Vector Graphis
- Scales with Display
- Very small file Size

## Complex Shapes

- Created using Path
- Consists of properties
  - M - moveto - Specify the strt point with X and Y coordinates eg. M12 5
  - L - lineto - Draw a line from current point to certain Point eg. L150 5
  - Z - closepath - Ends the diagram by drawing a straigth line to strt point i.e M eg. Z
  - C - Curve Line - Starting point, Control Had (Defines the curviness), Ending Point
  - etc

## Method Chaining

- Each function ill return the response and next function will makechanges over previous function
- Prevents creating multiple variables

## Importnat mmethods

- attr - Add attibutes to SVg eg, x, y, height, idth, fill, etc
- append - Create a new element
- select - Select first element of a type
- style - Apply CSS styling

## Groups

- Grouping Similar elements togetger
- Allows easier manipulation of mumltiple elements
- Useful if we have to make multiple charts on same svg

## Data

- Data function Maps data with seleced element
- First item in data array is mapped with first element insde select array

## Enter Selection

- Creates element based on number of items in data array
- It compres data and available elemnts, and according cretes new elements
- Eg. .enter().append('rect')
- Here we are specifying that we jve to create new rect element to map the remainin data
- `selectAll('rect').data(data).enter().append('rect')` line is always required, as we are required to first `check/select availble elements` in DOM even if there are none present and only then we can create new element using `enter()` as required

```js
const rec = svg.selectAll('rect').data(data);

// Add styling to rect elements alreay present in HTML page
rec
  .attr('width', function (d, i, n) {
    // d - Data
    // i - Index
    // n - Node (All Eleemnts), Allows acces to node , helpful in arrow function where this keyword doesnt give curren element
    return d.width;
  })
  .attr('height', (d) => d.height)
  .attr('fill', (d) => d.fill);

// Adds styling to elements after creating them
rec
  .enter()
  .append('rect')
  .attr('width', (d, i, n) => d.width)
  .attr('height', (d) => d.height)
  .attr('fill', (d) => d.fill);
```

## Selection in Detail (Enter, Exit, Group)

- `const rects = svg.selectAll('rect').data(dataset)` Crates an object with a list of enter(), exit(), group()
- enter() - Contains a list of all eelemnts that will be created in DOM
- exit() - COntains elment that must be removed and not needed in DOM (Prviously present rect elements that dont match dataset)
  - eg. Initially there were 10 elements, after update to data set there ere 4 elements, then exit() wll contain 6 nodes
- group() - Contains list of all DOM elements currently present inside the selected DOM

## Linear Scale

- Normalize the data based on availalbe height, width
- Suppose we have data with value 1000 and our svg is only 200px, in such scenario are have to scale down the data
- Highest value of dataset will be mpped to highest vlue on scale
- Snippet
  ```js
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)])
    .range([0, 600]);
  ```
  - Range must be the width of our svg
  - Domain must reflect he min/max value of data of singlty more than the max value of data
- Using Linear Scale
  ```js
  .attr('height', (d) => y(d.orders))
  ```
  - Calculate heights relative to linear scale

## Band Scale

- Categorize data in a bar chart
- Hord coding x value of rect is not good if we dont kno the number of data available, it can exceept the svg siz
- Ensures all the data fits along the x axis
- We pass a list of names, and bandScale utomatically calculates the width of each bar
- Band scale assigns a bandwidth (Width) to eaach bar
  ```js
  const x = d3
    .scaleBand()
    .domain(data.map((i) => i.name))
    .range([0, 600])
    .paddingInner(0.3)
    .paddingOuter(0.1);
  ```
- Domain species the different categories of data
- Range specifis the min and max idth of svg
- PaddingInner is the disance between 2 bars
- paddingOuter is distance between svg boundary and first/ last bar
- Using the scale
  ```js
   .attr('width', (d) => x.bandwidth())
  .attr('x', (d, i) => x(d.name))
  ```
  - x.bandwidth() calculate width based on total available width
  - x(d) Provides the x or starting point of each category bar

## Min, Max, Extent

- min() - Red=turns the miium value in the domain
  - eg. `d3.min(data, (d) => d.orders)` First arg is dataset, second is the mapping to actual field for which min is to be calculated
- max() - Rrturns max value
- extent() - Retuns aray containing min, max

## Axis

- Steps to create Axis

1. Create x-asic group Element using `const xAxisGroup = graph.append('g')`
2. Similary create yaxis group Element `const yAxisGroup = graph.append('g')`
3. Create an Actual Axis in memory based on Scale `const xAxis = d3.axisBottom(x);`
4. Repeat the same for y `const yAxis = d3.axisLeft(y);`
5. Display this axis created in memoery using `xAxisGroup.call(xAxis);`
6. Repeat the same process for y `yAxisGroup.call(yAxis);`

## INverting Axis

- By default our origin is at top left corner of svg
- X axis
  - When we create X axis, it is shown at the top
  - We can move it down using transform: translateY(graphHeight)
- Y axis
  - As it starts from 0 at top, it looks invete to us
  - Axis can be Fixed by Changig the Scale range from `0, height` to` height, 0`
  - Bars are drawn from top to bottom, we can move their origin of bar using `.attr('y', d => d.yAttribute)`
  - However the data will look inconsisen as the range was inverted, so we have to fix that by substracting the height of bar with SVG height `.attr('height', (d) => graphHeight - y(d.yAttribute))`

## Ticks

- Tickes are label in the a and y axxis
- The can be minipulated in the section whe we generate the x, y axes in memory
  - eg. `const yAxis = d3.axisLeft(y).ticks(5);` Tries to show only 5 labels ere visible on y axis
  - eg. `.tickFormat(d => d + ' Orders')` Appends 'Orders' to Y axis labels
- To modify **CSS Styling** of tickets, we style the actual `xAxisGroup`, `yAxisGroup` elemnt instead of axis created in memory
  - eg. `xAxisGroup.selectAll('text').style('transform', 'rotate(40deg)');`

## Over all procedure to create Chart

1. Select the Div elemnt
2. Append SVG elemnt to it along with its height and width
3. Define the margin values
4. Create Height, Width Variable by subtracting margins
5. Create a group and append to svg (Will be used for Actul grap)
6. Define X and Y Scale, Band
7. Create chart using data inside the group created in step 5
8. Crreate x, y axis group elemnt
9. Generate x, y axis using Scale
10. Add this generatd x, y axis in to the group created in step 6

## Transition

- Create a transition during creation, data change
- Usually put inside .enter() as we show them hen they are created
- We specify the initial Postion simply using `.attr(...)` and then the final posiion after `.transition().duration(500).attr(...)`
- D3 automatically shows the state change between the states

### Transition Bar chart

- Transition in .enter()

```js
rects
  .enter()
  .append('rect')
  .attr('fill', 'orange')
  .attr('height', 0) // Start Condition
  .attr('y', graphHeight)
  .attr('width', x.bandwidth)
  .attr('x', (d, i) => x(d.name))
  .transition()
  .duration(500)
  .attr('height', (d) => graphHeight - y(d.orders)) // End Condition
  .attr('y', (d) => y(d.orders));
```

- Here we are adding transition in Bar heigh using `height`, `y`
- INitial State is `y = graphHeight,height = 0`
- Final State will be `y = y(d.orders), height = graphHeight - y(d.orders)`

- Transition without .enter()

  - Here we are applying transition whose initial state is already present
  - Trsnaiton are applied on data update, so from previous position to new poistion
  - SO we dont need to specify initial properties

  ```js
  rects
    .attr('fill', 'orange')
    .attr('x', (d, i) => x(d.name))
    .attr('width', x.bandwidth)
    .transition()
    .duration(500)
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('y', (d) => y(d.orders));
  ```

### Merge

- Allows reusing transition
- If we have specifed the final state of transitio inside enter()
  - we can reuse it using .merge(rects) inside .enter()
  - We can then remove .transition().attr (...) in other parts
  - Baically we are telling to apply transition property to current rects and previous rects in DOM

````js
  rects
    .enter()
    .append('rect')
    .attr('fill', 'orange')
    .attr('width', x.bandwidth)
    .attr('height', 0) // Start Condition
    .attr('y', graphHeight)
    .attr('x', (d, i) => x(d.name))
    .merge(rects)
    .transition()
    .attr('height', (d) => graphHeight - y(d.orders)) // End Condition
    .attr('y', (d) => y(d.orders));
```

## Steps to Update a chart

1. Fetch the new dataset
2. Update the Scale
3. Join the elements to data using `const rec = selectAll().data()`
4. Remov unwanted eleents using `rec.exit().remove();`
5. Update atributes of existing DOM elements `rects.attr(...etc)`
6. Append the new DOM elements using `rec.enter().append('rect').attr(...etc)`
````
