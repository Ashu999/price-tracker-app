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
const apiDomain: any = process.env.API_DOMAIN;
const clientAddress: any = process.env.CLIENT_ADDRESS;
const loginApiBase: any = process.env.LOGIN_API_BASE;
// console.log(
//   `CLIENT ENVs : apiDomain- ${apiDomain}, clientAddress- ${clientAddress}, loginApiBase- ${loginApiBase}`
// );

SuperTokens.init({
  appInfo: {
    appName: 'price-tracker-app',
    apiDomain: apiDomain,
    websiteDomain: clientAddress,
    apiBasePath: loginApiBase,
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
        <Route path='/health' element={<p>Client: All Good</p>}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </SuperTokensWrapper>
);
