import React from 'react';
import ScatterPlotMap from '../ScatterPlotMap';
import data from '../data/us-counties-8200-geocoded.json';

const xSelector = d => parseFloat(d.longitude);
const ySelector = d => parseFloat(d.latitude);
const rSelector = d => parseFloat(d.population);
const playerPerPixel = 42000;

function PopulationMap(props) {
  return (
    <ScatterPlotMap
      data={data}
      xSelector={xSelector}
      ySelector={ySelector}
      rSelector={rSelector}
      width={600}
      height={400}
      populationPerPixel={playerPerPixel}
    />
  );
}

export default PopulationMap;
