import { prisma } from './init';
import { Item } from '@/types/db';

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

export async function getItems() {
  return await prisma.item_details.findMany({
    select: {
      id: true,
      name: true,
      url: true,
      price: true,
      supertokens_user_id: true,
    },
  });
}

export async function getItemsByUserId(id: string) {
  return await prisma.item_details.findMany({
    where: {
      supertokens_user_id: id,
    },
    select: {
      id: true,
      name: true,
      url: true,
      price: true,
    },
  });
}

export async function updatePrice(itemId: string, itemPrice: string) {
  return await prisma.item_details.update({
    where: {
      id: itemId,
    },
    data: {
      price: itemPrice,
    },
  });
}
