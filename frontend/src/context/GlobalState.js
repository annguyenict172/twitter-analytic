import React, { createContext, useReducer } from 'react';
import reducer from './AppReducer';

// Initial State
const initialState = {
  city: 'Melbourne',
  scenario: 'popular_hashtags',
  date: 'May 15',
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
