import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';

import Header from './Header';
import Tournaments from './tournaments';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Tournaments />
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
