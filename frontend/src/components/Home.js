import React,  { Component }  from 'react';
import LogoImage from './../images/sydney.jpg';
import styled from 'styled-components';
import './../style/home.css'
import { Row, Container, Card, CardDeck} from "react-bootstrap";



const Styles = styled.div`

    h1{
        padding-bottom: 20px;
        font-family: "Biryani";
        font-size: 70px;
        font-weight: bold;
        color: #fff;
  
    }
    h2 {
        padding-bottom: 40px;
        font-size: 40px;
        font-weight: bold;
        color:  #fff;
        font-family: "sans-serif";
    }

    .container  {
        display: inline-block;
        width: 600px;
        height: 600px;
        transform: translate(-50%, -50%);
        text-align: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
    }

    .card {
        background-color: rgba(245, 245, 245, .6);

    }
    .card-header, .card-footer { opacity: 1}

    .card-title, .card-text {
        font-weight: bold;
        font-size: 20px;
    }
`;

  class HomePage extends Component {
      render() {
        return (
          
        <div className="bg" style={{backgroundImage: `url(${LogoImage}`}} >
            <Styles>
                <Container >
                    <h1>Australian Tweet Analysis</h1>
                    <h2>An exploration of multiple scenarios drawn from Twitter Data</h2>
                    <CardDeck>                      
                        <Card>
                            <Card.Body>
                            <Card.Title>GRAPHICAL COVID CRISIS ANALYSIS   </Card.Title>
                            <Card.Text>
                                Bar and Line Graphs of Covid's impact as told by Aussie Tweets.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                            <Card.Title>MAP BASED TWEET ANALYSIS</Card.Title>
                            <Card.Text>
                                A Map Based View of the sentiment of Australian Tweets.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Container>
            </Styles>
            
            
                
            
            
        </div>
        );
        }
}   


export default HomePage;
