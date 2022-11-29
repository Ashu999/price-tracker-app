import express from 'express';
export const routes = express();
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { SessionRequest } from 'supertokens-node/framework/express';

routes.post('/add-item', verifySession(), (req: SessionRequest, res) => {
  let userId = req.session?.getUserId();
  // getPasswordlessUserData;
  res.send('OK: ' + userId);
  //....
});
