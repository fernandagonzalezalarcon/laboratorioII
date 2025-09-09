import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

const width = 900, height = 600

//escala para eje x (meses)
const mesScale = d3.scaleBand()
    .domain(data.map(d => d.mes))
    .range([margin.left, margin.left + width])
    .padding(0.2);

//escala par eje y (pasajeros)
const pasajerosScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.pasajeros)])
    .range([margin.top + height, margin.top])

//barras
d3.select('.barras')
  .selectAll('rect')
  .data(data)
  .join('rect')
  .attr('x', d => mesScale(d.mes))
  .attr('y', d => pasajerosScale(d.pasajeros))
  .attr('width', mesScale.bandwidth())
  .attr('height', d => (margin.top + height) - pasajerosScale(d.pasajeros))

//ejex
const xAxis = d3.axisBottom(mesScale)

d3.select('.axis-x')
  .attr('transform', `translate(0, ${margin.top + height})`)
  .call(xAxis)
  .append('text')
  .text('Meses')
  .attr('x', width / 2 + margin.left)
  .attr('y', 50)
  .attr('fill', '#000')
  .attr('font-size', '15px')
  .attr('text-anchor', 'middle')

//eje y
const yAxis = d3.axisLeft(pasajerosScale)
  .tickValues([0, 9e5, 1e6, 1.1e6, 1.2e6, 1.3e6, 1.4e6, 1.5e6])

d3.select('.axis-y')
  .attr('transform', `translate(${margin.left}, 0)`)
  .call(yAxis)
  .append('text')
  .text('Cantidad de pasajeros')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2 - margin.top)
  .attr('y', -50)
  .attr('fill', '#000')
  .attr('font-size', '15px')
  .attr('text-anchor', 'middle')