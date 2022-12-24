import { prisma } from './init';
import { deleteUser } from 'supertokens-node';

export async function deleteUserById(userId: string) {
  await deleteUser(userId); // this will succeed even if the userId didn't exist.
}
