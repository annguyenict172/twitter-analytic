import React from 'react';
import { NavBar } from './NavBar';
import { BtnBar } from './ToggleBar'; 
import { MapNavBar } from './MapNavBar';
import DataVisualization from './DataVisualization';
import { GlobalProvider } from '../context/GlobalState';
import { Row, Container, Card, CardDeck} from "react-bootstrap";
import styled from 'styled-components';
import { TweetsPerDay } from './TweetsPerDayGraph';
import { CasesPerDay } from './CasesPerDayGraph';

const Styles = styled.div`

  #nav {
      display: block;
  }

  h1 {
      text-align: center;
  }

`;

class LocationGraph extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <Styles>
                <Container fluid >
                    <Row id="nav" ><NavBar /></Row>
                    <Container>
                        <Row></Row>
                        <h1> COVID-19 Over Time</h1>
                        <h2> Time Sensitive Overview</h2>
                       <CardDeck>                      
                        <Card>
                            <Card.Body>
                            <Card.Title>Total Number of Confirmed Cases</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                            <Card.Title>Date of Highest Confirmed Cases</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                            <Card.Title>Total Number of Recovered Cases</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card> 
                            <Card.Body>
                            <Card.Title>Date of Most Recoveries</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card> 
                            <Card.Body>
                            <Card.Title>Avg Number of Daily Tweets</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </CardDeck> 
                        {/* <TweetsPerDay />
                        <CasesPerDay /> */}
                    </Container>
                </Container>
            </Styles>

        )
    }
}
export default LocationGraph