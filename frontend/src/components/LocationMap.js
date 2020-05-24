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