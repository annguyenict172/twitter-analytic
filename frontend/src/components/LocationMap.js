/*
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
*/

import React from 'react';
import { NavBar } from './NavBar';
import { BtnBar } from './ToggleBar'; 
import { MapNavBar } from './MapNavBar';
import DataVisualization from './DataVisualization';
import { GlobalProvider } from '../context/GlobalState';
import { Row, Container} from "react-bootstrap";
import styled from 'styled-components';

const Styles = styled.div`

  .row {
      display: block;
  }

`;

class LocationMap extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <Styles>
                <Container fluid>
                    <Row><BtnBar /></Row>
                    <GlobalProvider>
                        <Row><MapNavBar /></Row>
                        <Row><DataVisualization /></Row>
                    </GlobalProvider>
                    
                </Container>
            </Styles>
            
        )
    }
}
export default LocationMap