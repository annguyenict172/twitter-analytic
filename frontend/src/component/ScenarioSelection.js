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
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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