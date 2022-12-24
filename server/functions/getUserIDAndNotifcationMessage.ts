//check current price of all items, if change: update DB+send notfication to user
import { getItemsData } from '../dbOperations/Item';
import { getCurrentPrice } from './getCurrentPrice';
import { updatePrice } from '../dbOperations/Item';
import { getNotificationMessage } from './getNotificationMessage';
import { deleteUserById } from '../dbOperations/User';
import { notifyByEmail } from './notifybyEmail';
// import { getPhoneNo } from '../dbOperations/User';

const testEmail = 'ashutosh.sharma.068255@gmail.com';
const testMessage = 'Price has decreased';
export async function getUserIDAndNotifcationMessage() {
  //   await notifyByEmail(testEmail, testMessage);
  //   await updatePrice('5690115a-e8e8-495d-9f65-4657e104bdd8', '₹950.00');
  const items = await getItemsData();
  console.log('items: ', items);
  const userIDAndNotifcationMessage = new Array<NotificationData>();
  userIDAndNotifcationMessage.push({ email: 'emailID', message: 'MESS' });
  console.log('Array of Obj: ', userIDAndNotifcationMessage);

  items.forEach(async (item) => {
    const oldPrice = item.price;
    const newPrice = '₹945.00';
    // const newPrice = await getCurrentPrice(item.url);
    // console.log('NP: ', newPrice);

    const message = getNotificationMessage(
      item.name,
      oldPrice,
      newPrice,
      item.url
    );
    if (message != null) {
      //get email and message, push in userIDAndNotifcationMessage
      console.log('MESS: ', message);
    } else console.log('NULL MESS: ', message);
  });
}

interface NotificationData {
  email: string;
  message: string;
}
