/*
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
*/

import React, { createContext, useReducer } from 'react';
import reducer from './AppReducer';

// Initial State
const initialState = {
  city: 'melbourne',
  scenario: 'popular_hashtags',
  date: 'May 15',
  location: {
    lat: -37.840935,
    lng: 144.946457
  },
  url: '/popular_hashtags/melbourne_popular_hashtags',
};


// Create context
export const GlobalContext = createContext();

// Provider components
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ view: state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
