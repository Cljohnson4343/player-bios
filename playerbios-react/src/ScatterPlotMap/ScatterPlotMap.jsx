import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

function ScatterPlotMap(props) {
  const { data, height, populationPerPixel, rSelector, width, xSelector, ySelector } = props;

  const canvasEl = useRef(null);

  const outerWidth = width;
  const outerHeight = height;
  const margin = { left: 40, top: 40, right: 40, bottom: 40 };
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;

  const svg = d3
    .select(canvasEl.current)
    .append('svg')
    .attr('width', outerWidth)
    .attr('height', outerHeight)
    .style('border', '1px solid black')
    .style('background', 'black');

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const xScale = d3
    .scaleLinear()
    .range([0, innerWidth])
    .domain(d3.extent(data, xSelector));
  const yScale = d3
    .scaleLinear()
    .range([innerHeight, 0])
    .domain(d3.extent(data, ySelector));
  const rScale = d3.scaleSqrt().domain([0, d3.max(data, d => rSelector(d))]);

  const popMax = rScale.domain()[1];
  const rMin = 0;
  const rMax = popMax / (populationPerPixel * Math.PI);
  rScale.range([rMin, rMax]);

  // bind data
  const circles = g.selectAll('circle').data(data);

  // enter phase
  circles
    .enter()
    .append('circle')
    .attr('cx', d => xScale(xSelector(d)))
    .attr('cy', d => yScale(ySelector(d)))
    .attr('r', d => rScale(rSelector(d)))
    .attr('fill', 'rgba(255, 255, 255, 0.3)');

  // exit phase
  circles.exit().remove();

  return <div ref={canvasEl}></div>;
}

ScatterPlotMap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired,
  populationPerPixel: PropTypes.number.isRequired,
  rSelector: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  xSelector: PropTypes.func.isRequired,
  ySelector: PropTypes.func.isRequired
};

export default ScatterPlotMap;
