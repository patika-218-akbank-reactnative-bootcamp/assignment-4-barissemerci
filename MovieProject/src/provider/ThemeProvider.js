import React, {useState} from 'react';
import {ThemeContext} from '../context/theme';
import dark from '../constants/theme/dark.js';
import light from '../constants/theme/light.js';

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(light);
  const handleToggleTheme = newTheme => {
    if (newTheme === 'light') {
      setTheme(light);
    } else {
      setTheme(dark);
    }
  };

  return (
    <ThemeContext.Provider 
      value={{theme, setTheme, toggleTheme: handleToggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
