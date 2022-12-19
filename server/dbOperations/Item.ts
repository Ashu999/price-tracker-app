import { prisma } from './init';
import { Item } from '@/types/db';
import { UUIDVersion } from 'express-validator/src/options';

export async function addItem(item: Item) {
  await prisma.item_details.create({
    data: {
      name: item.name,
      url: item.url,
      price: item.price,
      supertokens_user_id: item.supertokens_user_id,
    },
  });
}

export async function deleteItem(id: string) {
  await prisma.item_details.delete({
    where: {
      id: id,
    },
  });
}
