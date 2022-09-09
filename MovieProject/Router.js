import React, {useRef} from 'react';
import MainContainer from './src/navigation/MainContainer';
import FlashMessage from 'react-native-flash-message';

function App() {
  const ref = useRef();
  return (
    <>
      <MainContainer />

      <FlashMessage ref={ref} />
    </>
  );
}

export default App;
