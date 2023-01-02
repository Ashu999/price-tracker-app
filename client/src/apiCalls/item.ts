const serverAddress: string =
  process.env.REACT_APP_SERVER_ADDRESS || 'http://localhost:80';

export async function addItemAPI(item: any) {
  const rawResponse = await fetch(`${serverAddress}/item`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const content = await rawResponse.json();
  // console.log(content);
}

export async function getUserItemsAPI() {
  const rawResponse = await fetch(`${serverAddress}/item`, {
    method: 'GET',
  });
  const content = await rawResponse.json();
  // console.log(content);
  return content;
}

export async function deleteItemAPI(key: string) {
  const rawResponse = await fetch(`${serverAddress}/item`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: key }),
  });
  const content = await rawResponse.json();
  // console.log(content);
  return content;
}
