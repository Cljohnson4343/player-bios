import React from 'react';
import { makeStyles } from '@material-ui/styles';
import HometownHeatMap from './HometownHeatMap';

const useStyles = makeStyles({
  container: {
    display: 'flex'
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <HometownHeatMap />
    </div>
  );
}

export default App;
