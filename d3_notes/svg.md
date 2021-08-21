# SVG

- [SVG](#svg)
  - [Description](#description)
  - [Complex Shapes](#complex-shapes)
  - [Method Chaining](#method-chaining)
  - [Importnat mmethods](#importnat-mmethods)
  - [Groups](#groups)
  - [Data](#data)
  - [Enter](#enter)

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

## Enter

- Creates element based on number of items in data array
- It compres data and available elemnts, and according cretes new elements
- Eg. .enter().appent('rect')
- Here we are specifying that we jve to create new rect element to map the remainin data

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
