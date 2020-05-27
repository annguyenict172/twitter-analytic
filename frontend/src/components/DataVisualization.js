/*
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
*/

import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GoogleApiWrapper from './Map';
import '../style/App.css'; 

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function DataVisualization() {
  const { view } = useContext(GlobalContext);
  const [json, setJson] = useState(0);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    fetch(view.url).then(res=>res.json()).then(temp=>temp[view.date]).then(data=>{
      setJson(data);
    })
  }, [view]);

  const text = [];

  switch(view.scenario) {
    case 'popular_hashtags':
      for(const key of Object.keys(json))
      {
        for(const rank of Object.keys(json[key])){
          text.push( <p> {'rank '+rank+': '+json[key][rank]['hashtag']+'; count: '+json[key][rank]['count']} </p>);
        }
      }
      break;
    case 'sentiment_scores':
      text.push( <p> {JSON.stringify(json)} </p>);
      break;
    case 'lang':
      for(const lang of Object.keys(json))
      {
        text.push( <p> {lang+': '+JSON.stringify(json[lang])} </p>);
      }
      break;
    case 'job':
      text.push( <p> {JSON.stringify(json)} </p>);
      break;
    default: ;
  }

  return (
    <div className='Data-Visualization'>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <div className='Map'>
          <GoogleApiWrapper />
        </div>
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{ text }</Typography>
      </Popover>
    </div>
  );
}

export default DataVisualization;