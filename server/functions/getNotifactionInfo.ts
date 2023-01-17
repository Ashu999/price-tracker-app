//check current price of all items, if change: update DB+send notfication to user
import { getItems } from '../dbOperations/Item';
import { getCurrentPrice } from './getCurrentPrice';
import { updatePrice } from '../dbOperations/Item';
import { getNotificationMessage } from './getNotificationMessage';
import { getUserInfo } from './getUserInfo';

export async function getNotifactionInfo() {
  const mapUserIDtoMail = await getUserInfo();

  let notifactionInfo = new Array<NotificationData>();
  const items = await getItems();

  for (const item of items) {
    const oldPrice = item.price;
    // const newPrice = '₹300.00';
    const newPrice: string = (await getCurrentPrice(item.url)) || oldPrice;
    await updatePrice(item.id, newPrice).catch((error) => {
      console.error(
        `Could not update Price in DB for itemId: ${item.id}, price: ${newPrice}, Error:  ${error}`
      );
    });
    await getNotificationMessage(item.name, oldPrice, newPrice, item.url)
      .then((message) => {
        if (message) {
          notifactionInfo.push({
            userId: item.supertokens_user_id,
            email: mapUserIDtoMail[item.supertokens_user_id],
            message: message,
          });
        }
      })
      .catch((error) => {
        console.error('Could not get Message for Notification: ', error);
      });
  }
  return notifactionInfo;
}

interface NotificationData {
  userId: string;
  email: string | null;
  message: string;
}
