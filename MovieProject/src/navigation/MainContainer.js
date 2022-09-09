import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ThemeProvider from '../provider/ThemeProvider';

import MainStackNavigator from './MainStackNavigator';
import {store} from '../redux/store';
import {Provider} from 'react-redux';
export default function MainContainer() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider>
          <MainStackNavigator />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
