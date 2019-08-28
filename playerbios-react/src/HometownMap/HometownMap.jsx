import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { latLonData } from '../data';
import ScatterPlotMap from '../ScatterPlotMap';

const xSelector = d => parseFloat(d.longitude);
const ySelector = d => parseFloat(d.latitude);
const rSelector = d => parseFloat(d.population);
const playerPerPixel = 1;

function HometownMap(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4343/api/v0/bios/bios').then(response => {
      setData(latLonData(response.data));
    });
  }, []);

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

export default HometownMap;
