import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { dobData } from '../data';

const xSelector = d => d.date;
const ySelector = d => d.value;

const getExtent = data => {
  if (data.length === 0) return { min: 0, max: 0 };
  let poles = {
    min: ySelector(data[0]),
    max: ySelector(data[0])
  };
  return data.reduce((acc, d) => {
    let v = ySelector(d);
    if (v < acc.min) {
      acc.min = v;
    }
    if (v > acc.max) {
      acc.max = v;
    }
    return acc;
  }, poles);
};

function DOBHistogram(props) {
  const [data, setData] = useState([]);

  const canvsEl = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:4343/api/v0/bios/bios').then(response => {
      setData(dobData(response.data));
    });
  }, []);

  const canvasWidth = 1200;
  const canvasHeight = 100;

  const svgCanvas = d3
    .select(canvsEl.current)
    .append('svg')
    .attr('width', canvasWidth)
    .attr('height', canvasHeight)
    .style('border', '1px solid black');

  const xScale = d3
    .scaleBand([0, canvasWidth])
    .range([0, canvasWidth])
    .domain(data.map(d => xSelector(d)));

  const extent = getExtent(data);
  const yScale = d3
    .scaleLinear()
    .domain([0, extent.max])
    .range([canvasHeight, 0]);

  // bind data
  const bars = svgCanvas.selectAll('rect').data(data);

  // enter phase
  bars
    .enter()
    .append('rect')
    .attr('width', xScale.bandwidth())
    .attr('fill', 'green')
    .attr('x', d => xScale(xSelector(d)))
    .attr('y', d => yScale(ySelector(d)))
    .attr('height', d => canvasHeight - yScale(ySelector(d)));

  // exit phase
  bars.exit().remove();

  return <div ref={canvsEl}></div>;
}

export default DOBHistogram;
