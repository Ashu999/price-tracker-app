//check current price of all items, if change: update DB+send notfication to user
import { getItemsData } from '../dbOperations/Item';
import { getCurrentPrice } from './getCurrentPrice';
import { updatePrice } from '../dbOperations/Item';
import { getNotificationMessage } from './getNotificationMessage';
// import { getPhoneNo } from '../dbOperations/User';

export async function getAllItemsFromDB() {
  //   await updatePrice('5690115a-e8e8-495d-9f65-4657e104bdd8', '₹950.00');
  const items = await getItemsData();
  console.log('items: ', items);
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
    console.log('MESS: ', message);
    // const PhoneNo = await getPhoneNo(item.supertokens_user_id);
    // console.log('PH no: ', PhoneNo);
  });
}
