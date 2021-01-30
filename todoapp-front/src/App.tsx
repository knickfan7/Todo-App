import React from 'react';
import Home from './components/home';
import store from './stores/store';
import {Provider} from 'react-redux';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
