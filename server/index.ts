import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import express from 'express';
import cors from 'cors';
import { middleware } from 'supertokens-node/framework/express';

supertokens.init({
  framework: 'express',
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: 'https://try.supertokens.com',
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'price-tracker-app',
    apiDomain: 'http://localhost',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/login',
    websiteBasePath: '/login',
  },
  recipeList: [
    Passwordless.init({
      flowType: 'USER_INPUT_CODE',
      contactMethod: 'EMAIL_OR_PHONE',
    }),
    Session.init(), // initializes session features
  ],
});

let app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

// IMPORTANT: CORS should be before the below line.
app.use(middleware());

app.get('/', (req, res, next) => {
  res.send('Welcome Home');
});
app.listen(80);
