import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import { NotFound } from './pages/NotFound';

SuperTokens.init({
  appInfo: {
    appName: 'price-tracker-app',
    apiDomain: 'http://localhost',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/login',
    websiteBasePath: '/login',
  },
  recipeList: [
    Passwordless.init({
      contactMethod: 'EMAIL',
    }),
    Session.init(),
  ],
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <SuperTokensWrapper>
    <BrowserRouter>
      <Routes>
        {/*This renders the login UI on the /login route*/}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
        {/*Your app routes*/}
        <Route path='/' element={<App />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </SuperTokensWrapper>
);
