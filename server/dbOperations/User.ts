import { prisma } from './init';
import { deleteUser } from 'supertokens-node';

export async function deleteUserById(userId: string) {
  await deleteUser(userId); // this will succeed even if the userId didn't exist.
}

export async function getUserIdAndEmail() {
  return await prisma.passwordless_users.findMany({
    select: {
      user_id: true,
      email: true,
    },
  });
}
