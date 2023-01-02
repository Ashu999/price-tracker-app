import { CronJob } from 'cron';
import { getNotifactionInfo } from '../functions/getNotifactionInfo';
import { notifyByEmail } from '../functions/notifyByEmail';

async function sendNotification() {
  console.log('CronJob Triggered');
  const notifcationInfo = await getNotifactionInfo();
  console.log('NOTI :', notifcationInfo);
  for (const info of notifcationInfo) {
    if (info.email) {
      notifyByEmail(info.email, info.message);
    } else {
      console.error('Email Not Found for: ', info.userId);
    }
  }
}

// create a new CronJob to run the function at 8AM, 2PM and 8PM every day
export const job = new CronJob('0 8,14,20 * * *', sendNotification);

// 06:07PM
// export const job = new CronJob('7 18 * * *', sendNotification);

console.log('Cron Job Started');
