import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import DateSelection from "./DateSelection";
import CitySelction from "./CitySelection";
import ScenarioSelection from "./ScenarioSelection";

import styled from 'styled-components';
const Styles = styled.div`
  .navbar { background-color: #222; width:100%; }
  a, .navbar-nav, .navbar-light .nav-link .nav-item {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
`;
export const MapNavBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="basic-mapnavbar-nav"/>
      <Navbar.Collapse id="basic-map-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><DateSelection></DateSelection></Nav.Item>
          <Nav.Item><CitySelction></CitySelction></Nav.Item> 
          <Nav.Item><ScenarioSelection></ScenarioSelection></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);









// import React from 'react';
// import styled from "styled-components";
// import DateSelection from "./DateSelection";
// import CitySelction from "./CitySelection";
// import ScenarioSelection from "./ScenarioSelection";


// const StyledMapNav = styled.div`
//   position: fixed;     
//   height: 100%;
//   width: 100%;     
//   // z-index: 1;      
//   // top: 3.4em;      
//   background-color: #222; 
//   overflow-x: hidden;     
//   // padding-top: 10px;
// `;

// class MapNav extends React.Component {
//   render() {
//     return (
//       <StyledMapNav></StyledMapNav>
//     );
//   }
// }

// export default class MapNavBar extends React.Component {
//     render() {
//       return (
//         <MapNav>
//           {/* <DateSelection /> */}
//           <ScenarioSelection />
//           <CitySelection />
//         </MapNav>
      
//       );
//     }
//   }