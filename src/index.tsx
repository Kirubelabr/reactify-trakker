import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import locale_en from './lang/en_US.json';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const localStorageEnv = localStorage.getItem('env');
// const env = localStorageEnv ? JSON.parse(localStorageEnv ?? '{}') : {};

const locale = navigator.language;

const languages = {
  en_US: locale_en,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider
        locale={locale}
        messages={languages['en_US']}
      >
        <App />
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
