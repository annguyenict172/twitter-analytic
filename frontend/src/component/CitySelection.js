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
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => { dispatch({ type: 'adelaide' }); }}>Adelaide</MenuItem>
                <MenuItem onClick={() => { dispatch({ type: 'melbourne' }); }}>Melbourne</MenuItem>
            </Menu>
        </div>
    );
}

export default CitySelection;
