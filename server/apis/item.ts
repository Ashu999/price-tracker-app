import express from 'express';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { SessionRequest } from 'supertokens-node/framework/express';
import { getCurrentPrice } from '../functions/getCurrentPrice';
import { body, validationResult } from 'express-validator';
import { addItem, deleteItem } from '../dbOperations/Item';
import { Item } from '@/types/db';
export const apiRoute = express();
apiRoute.use(express.json());

//ADD ITEM
apiRoute.post(
  '/item',
  verifySession(),
  body('name').isLength({ min: 1, max: 255 }),
  body('url').isURL(),
  async (req: SessionRequest, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.session?.getUserId() || '';
    const { name, url } = req.body;
    let curPrice: string;
    try {
      curPrice = await getCurrentPrice(req.body.url);
    } catch (err) {
      console.error('Could Not Add Item: ' + err);
      return res.status(500).json({ message: 'Could Not Add Item.' });
    }

    const item: Item = {
      name: name,
      url: url,
      price: curPrice,
      supertokens_user_id: userId,
    };
    await addItem(item);
    return res.json({ message: 'Item Added.' });
  }
);
//DELETE ITEM
apiRoute.delete(
  '/item',
  verifySession(),
  body('id').isUUID(),
  async (req: SessionRequest, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body;
    try {
      await deleteItem(id);
    } catch (err) {
      console.error('Could Not Delete Item: ' + err);
      return res.status(404).json({ message: 'Could Not Delete Item.' });
    }
    return res.json({ message: 'Item Deleted.' });
  }
);
