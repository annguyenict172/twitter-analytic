import React from 'react';
import { NavBar } from './NavBar';
import { BtnBar } from './ToggleBar'; 
import { GlobalProvider } from '../context/GlobalState';
import { Row, Container, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import styled from 'styled-components';
import adelaide  from '../images/adelaide.jpg';
import brisbane  from '../images/brisbane.jpg';
import canberra  from '../images/canberra.jpeg';
import melbourne  from '../images/melbourne.jpeg';
import perth from '../images/perth.jpeg';
import sydney from '../images/sydney.jpg';

const Styles = styled.div`

  #nav, #btnbar  {
      display: block;
  }

  #img {
      height:300px;
  }

  #top-cards {
      padding-top: 20px;
      padding-bottom:20px;
      

  }
  #top-cols {
      display: flex;
      flex-direction: row;
      padding-left: 15px;
      padding-right: 15px;
    

  }
   .card {
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 15px;
        padding-right: 15px;
        boder: none;

      flex: 1;
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
                    <Row id="btnbar"><BtnBar /></Row>
                    <Row id="top-cards">

                        <Col xs={10} md={12} id="top-cols">
                            <Card>
                                <Card.Img id="img" variant="top" src= {adelaide}/>
                                <Card.Body>
                                    <Card.Title> Top Statistics for Adelaide</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Total Number of Tweets Collected</ListGroupItem>
                                    <ListGroupItem>Top Hashtag</ListGroupItem>
                                    <ListGroupItem>Number of Confirmed COVID className</ListGroupItem>
                                    <ListGroupItem>Sentiment Score</ListGroupItem>
                                </ListGroup>
                            </Card>
                            <Card>
                                <Card.Img id="img" variant="top" src= {brisbane}/>
                                <Card.Body>
                                    <Card.Title> Top Statistics for Brisbane</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Total Number of Tweets Collected</ListGroupItem>
                                    <ListGroupItem>Top Hashtag</ListGroupItem>
                                    <ListGroupItem>Number of Confirmed COVID className</ListGroupItem>
                                    <ListGroupItem>Sentiment Score</ListGroupItem>
                                </ListGroup>
                            </Card>
                            <Card>
                                <Card.Img id="img" variant="top" src= {canberra} />
                                <Card.Body>
                                    <Card.Title>Top Statistics for Canberra</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Total Number of Tweets Collected</ListGroupItem>
                                    <ListGroupItem>Top Hashtag</ListGroupItem>
                                    <ListGroupItem>Number of Confirmed COVID className</ListGroupItem>
                                    <ListGroupItem>Sentiment Score</ListGroupItem>
                                </ListGroup>
                            </Card>

                        </Col>
                    </Row>
                    <Row id="top-cards">
                        <Col xs={10} md={12} id="top-cols"> 
                            <Card >
                                <Card.Img  id="img" variant="top" src= {melbourne} />
                                <Card.Body>
                                    <Card.Title>Top Statistics for Melbourne</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Total Number of Tweets Collected</ListGroupItem>
                                    <ListGroupItem>Top Hashtag</ListGroupItem>
                                    <ListGroupItem>Number of Confirmed COVID className</ListGroupItem>
                                    <ListGroupItem>Sentiment Score</ListGroupItem>
                                </ListGroup>
                            </Card>
                            <Card>
                                <Card.Img id="img" variant="top" src= {perth} />
                                <Card.Body>
                                    <Card.Title>Top Statistics for Perth</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Total Number of Tweets Collected</ListGroupItem>
                                    <ListGroupItem>Top Hashtag</ListGroupItem>
                                    <ListGroupItem>Number of Confirmed COVID className</ListGroupItem>
                                    <ListGroupItem>Sentiment Score</ListGroupItem>
                                </ListGroup>
                            </Card>
                            <Card>
                            <Card.Img id="img" variant="top" src= {sydney}/>
                            <Card.Body>
                                <Card.Title>Top Statistics for Sydney</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Total Number of Tweets Collected</ListGroupItem>
                                <ListGroupItem>Top Hashtag</ListGroupItem>
                                <ListGroupItem>Number of Confirmed COVID className</ListGroupItem>
                                <ListGroupItem>Sentiment Score</ListGroupItem>
                            </ListGroup>
                        </Card>

                        </Col>      
                    </Row>
                </Container>
            </Styles>
            
        )
    }
}
export default LocationGraph