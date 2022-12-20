import { CronJob } from 'cron';

function CheckForPriceChanges() {
  console.log('SUP');
}

// create a new CronJob to run the function at 8AM and 5PM every day
export const job = new CronJob('0 8,17 * * *', CheckForPriceChanges);

console.log('Cron Job Started');
