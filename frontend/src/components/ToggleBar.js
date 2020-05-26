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

function toggleLanguage() {
    var x = document.getElementById("tags");
    var y = document.getElementById("covid")
    if (x.style.display === "none") {
        y.style.dislay = "none";
        x.style.display = "block";
    } else {
        console.log("here");
    }
  }

  function toggleCovid() {
    var x = document.getElementById("tags");
    var y = document.getElementById("covid")
    if (y.style.display === "none") {
        console.log("here")
        x.style.display = "none";
        y.style.display = "block";
        // y.style.dislay = "none";
    } 
  }


export const BtnBar = () => (
    
    <Styles>
        <ButtonGroup aria-label="basic-button-group" >
            <Button onClick={this.props.handleClick}  variant="secondary" size="lg"  >Language and Hashtag View Analysis</Button >
            <Button  onClick={this.props.handleClick} variant="secondary" size="lg" >COVD19 View Analysis</Button >
        </ButtonGroup>
    </Styles>
  );

//   onClick={toggleLanguage}
