import React, { useContext, useEffect, useState } from 'react';
import { Button, Menu, MenuItem} from '@material-ui/core';
import { GlobalContext } from '../context/GlobalState';

function DateSelection() {
    const { dispatch } = useContext(GlobalContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { view } = useContext(GlobalContext);
    const [json, setJson] = useState(0);

    useEffect(() => {
        fetch(view.url).then(res=>res.json()).then(data=>{
        setJson(data);
        })
    }, [view]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dates = []

    for (const date of Object.keys(json)) {
        dates.push(<MenuItem onClick={() => { dispatch({ type: date }); }}>{date}</MenuItem>)
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Date
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {dates}
            </Menu>
        </div>
    );
}

export default DateSelection;