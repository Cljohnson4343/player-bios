import React from 'react';
import { makeStyles } from '@material-ui/styles';
import HometownMap from './HometownMap';
import PopulationMap from './PopulationMap';

const useStyles = makeStyles({
  container: {
    display: 'flex'
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <HometownMap />
      <PopulationMap />
    </div>
  );
}

export default App;
