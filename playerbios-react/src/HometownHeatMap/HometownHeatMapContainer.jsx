import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { latLonData } from '../data';
import populationData from '../data/usCounties2010.json';
import HometownHeatMap from './HometownHeatMap';

const xSelector = d => parseFloat(d.longitude);
const ySelector = d => parseFloat(d.latitude);
const rSelector = d => parseFloat(d.population);

function HometownHeatMapContainer(props) {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4343/api/v0/bios/bios').then(response => {
      setPlayerData(latLonData(response.data));
    });
  }, []);

  return (
    <HometownHeatMap
      height={800}
      width={1200}
      playerData={playerData}
      populationData={populationData}
      rSelector={rSelector}
      xSelector={xSelector}
      ySelector={ySelector}
    />
  );
}

export default HometownHeatMapContainer;
