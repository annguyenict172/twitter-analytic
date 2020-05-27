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

function CitySelection() {
    const { dispatch } = useContext(GlobalContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="City-Selection"> 
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color='inherit'>
                City
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => { dispatch({ type: 'adelaide' }); }}>Adelaide</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'melbourne' }); }}>Melbourne</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'brisbane' }); }}>Brisbane</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'canberra' }); }}>Canberra</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'perth' }); }}>Perth</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'sydney' }); }}>Sydney</MenuItem>
            </Menu>
        </div>
    );
}

export default CitySelection;
