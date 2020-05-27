/*
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
*/

import React, { useContext } from 'react';
import { Button, Menu, MenuItem} from '@material-ui/core';
import { GlobalContext } from '../context/GlobalState';

function SenarioSelection() {
    const { dispatch } = useContext(GlobalContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="Scenario-Selection">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color='inherit'>
                Scenario
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => { dispatch({ type: 'popular_hashtags' }); }}>Popular hashtags</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'sentiment_scores' }); }}>Covid-19</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'lang' }); }}>Language</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'job' }); }}>Job</MenuItem>
            </Menu>
        </div>
    );
}

export default SenarioSelection;