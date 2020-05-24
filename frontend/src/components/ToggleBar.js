import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    background-color: #6c757d;
    
    .btn { color: #9FFFCB;
        &:hover { color: white; }
        width:100%;
        border-style: groove;
        border-width: 2px;
        border-color: #9FFFCB;

    }
    .btn-group {
        width:100%;
    }
`;

export const BtnBar = () => (
    <Styles>
        <ButtonGroup aria-label="basic-button-group" >
            <Button href='#' variant="secondary" size="lg"  >Map View Analysis</Button >
            <Button  href='#' variant="secondary" size="lg" >Chart View Analysis</Button >
        </ButtonGroup>
    </Styles>
  );