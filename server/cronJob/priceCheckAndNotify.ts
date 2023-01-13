import { CronJob } from 'cron';
import { getNotifactionInfo } from '../functions/getNotifactionInfo';
import { notifyByEmail } from '../functions/notifyByEmail';

async function sendNotification() {
  var datetime = new Date();
  console.log('CronJob Triggered: ', datetime);
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

// create a new CronJob to run the function every 4 hours, at the 0th minute
export const job = new CronJob('0 */4 * * *', sendNotification);

// 10:53AM
// export const job = new CronJob('53 10 * * *', sendNotification);

console.log('Cron Job Started');
