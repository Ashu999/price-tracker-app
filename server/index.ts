import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import express from 'express';
import cors from 'cors';
import { middleware, errorHandler } from 'supertokens-node/framework/express';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { apiRoute as itemRoutes } from './apis/item';
import { apiRoute as healthRoutes } from './apis/health';
import { job as cronJob } from './cronJob/priceCheckAndNotify';

const apiDomain: any = process.env.API_DOMAIN; // || 'http://localhost';
const apiPort: any = process.env.API_PORT; // '80';
const clientAddress: any = process.env.CLIENT_ADDRESS; // || 'http://localhost:3000';
const supertokensAddress: any = process.env.SUPERTOKENS_ADDRESS; // || 'http://localhost:3567';
// console.log(
//   'SERVER ENVs :',
//   apiDomain,
//   apiPort,
//   clientAddress,
//   supertokensAddress
// );

supertokens.init({
  framework: 'express',
  supertokens: {
    connectionURI: supertokensAddress,
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'price-tracker-app',
    apiDomain: apiDomain,
    websiteDomain: clientAddress,
    apiBasePath: '/login',
    websiteBasePath: '/login',
  },
  recipeList: [
    Passwordless.init({
      flowType: 'USER_INPUT_CODE',
      contactMethod: 'EMAIL',
    }),
    Session.init(), // initializes session features
    Dashboard.init({
      apiKey: 'admin',
    }),
  ],
});

const app = express();

app.use(
  cors({
    origin: clientAddress,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

// IMPORTANT: CORS should be before the below line.
app.use(middleware());

// ...your API routes
app.use(healthRoutes);
app.use(itemRoutes);

// Add this AFTER all your routes
app.use(errorHandler());

// your own error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
  }
);

app.listen(apiPort);
console.log(`Server Started Port: ${apiPort}`);
if (!cronJob.running) {
  cronJob.start();
}
