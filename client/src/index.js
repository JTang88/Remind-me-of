import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import userStore from './stores/userStore';
import thoughtsStore from './stores/thoughtsStore';
import theme from './theme';
import './index.css';


ReactDOM.render(
  <BrowserRouter>
    <Provider
      userStore={userStore}
      thoughtsStore={thoughtsStore}
    >
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
