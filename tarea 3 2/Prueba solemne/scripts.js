import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

d3.select('.barras')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('width',16)
    .attr('height', function(d){
        return scale(d.pasajeros_bus)
    })
    .attr('y', function(d, i){
        return i * 10
    })