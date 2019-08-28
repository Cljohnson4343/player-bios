import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const alpha = 0.1;
function HometownHeatMap(props) {
  const { height, playerData, populationData, rSelector, width, xSelector, ySelector } = props;

  const canvasEl = useRef();

  const outerWidth = width;
  const outerHeight = height;
  const margin = { left: 50, right: 50, top: 20, bottom: 20 };
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;

  const longs = playerData.map(d => xSelector(d)).concat(populationData.map(d => xSelector(d)));
  const lats = playerData.map(d => ySelector(d)).concat(populationData.map(d => ySelector(d)));
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(longs, d => d))
    .range([0, innerWidth]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(lats, d => d))
    .range([innerHeight, 0]);

  const popRScale = d3.scaleSqrt().domain([0, d3.max(populationData, rSelector)]);
  const playerRScale = d3.scaleSqrt().domain([0, d3.max(playerData, rSelector)]);

  const USPopulation = populationData.reduce((acc, d) => rSelector(d) + acc, 0);
  const pixels = innerHeight * innerWidth;
  const popPerPixel = USPopulation / pixels;
  const popMax = popRScale.domain()[1];
  const popRMin = 0;
  const popRMax = Math.sqrt(popMax / (popPerPixel * Math.PI));
  popRScale.range([popRMin, popRMax]);

  const playerPopulation = playerData.reduce((acc, d) => acc + rSelector(d), 0);
  console.log(playerPopulation);
  const playerPerPixel = playerPopulation / pixels;
  const playerMax = playerRScale.domain()[1];
  const playerRMin = 0;
  const playerRMax = Math.sqrt(playerMax / (playerPerPixel * Math.PI));
  playerRScale.range([playerRMin, playerRMax]);

  useEffect(() => {
    d3.select(canvasEl.current)
      .selectAll('svg')
      .remove();

    const svg = d3
      .select(canvasEl.current)
      .append('svg')
      .attr('width', outerWidth)
      .attr('height', outerHeight)
      .style('border', '1px solid black')
      .style('background', 'black');

    const popG = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    popG
      .selectAll('circle')
      .data(playerData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(xSelector(d)))
      .attr('cy', d => yScale(ySelector(d)))
      .attr('r', d => playerRScale(rSelector(d)))
      .attr('fill', `rgba(255, 0, 0, ${alpha})`);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('circle')
      .data(populationData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(xSelector(d)))
      .attr('cy', d => yScale(ySelector(d)))
      .attr('r', d => popRScale(rSelector(d)))
      .attr('fill', `rgba(0, 0, 255, ${alpha})`);
  }, [playerData, populationData]);

  return <div ref={canvasEl} />;
}

HometownHeatMap.propTypes = {
  height: PropTypes.number.isRequired,
  playerData: PropTypes.arrayOf(PropTypes.object).isRequired,
  populationData: PropTypes.arrayOf(PropTypes.object).isRequired,
  rSelector: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  xSelector: PropTypes.func.isRequired,
  ySelector: PropTypes.func.isRequired
};

export default HometownHeatMap;
