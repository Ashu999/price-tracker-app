import { getUserIdAndEmail } from '../dbOperations/User';

export async function getUserInfo() {
  let userInfo = await getUserIdAndEmail();
  let mapUserIDtoMail: { [key: string]: string | null } = {};
  for (const element of userInfo) {
    mapUserIDtoMail[element.user_id] = element.email;
  }
  return mapUserIDtoMail;
}
