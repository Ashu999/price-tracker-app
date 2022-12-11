import express from 'express';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { SessionRequest } from 'supertokens-node/framework/express';
import { getCurrentPrice } from '../functions/getCurrentPrice';

export const apiRoute = express();
apiRoute.use(express.json());
apiRoute.post(
  '/add-item',
  verifySession(),
  async (req: SessionRequest, res) => {
    let userId = req.session?.getUserId();
    // let reqBody = req.body?.mess;
    // console.log('REQ: ', reqBody);

    // getPasswordlessUserData;
    /**
     * {"name": "Pintotal Peanut Butter", "url": "https://amzn.eu/d/aofaxIg"}
     *
     */
    console.log('URL :', typeof req.body.url);

    const curPrice = await getCurrentPrice(req.body.url);

    res.send('OK: ' + JSON.stringify(req.body) + userId + curPrice);
    //....
  }
);
