//Inc or Dec
export async function getNotificationMessage(
  name: string,
  oldPrice: string,
  newPrice: string,
  url: string
) {
  //keep only the price Decreased scenario
  if (oldPrice.localeCompare(newPrice) !== 1) return null;
  //   const priceStatus: string =
  //     oldPrice.localeCompare(newPrice) === 1 ? 'Decreased' : 'Increased';
  const message = `The price for item: ${name} has Decreased from ${oldPrice} to ${newPrice} \\ Item Link: ${url}`;
  return message;
}
