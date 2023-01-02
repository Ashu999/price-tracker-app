import { TableComp } from '../components/TableComp';
import { DrawerComp } from '../components/DrawerComp';
import React, { useEffect, useState } from 'react';
import { addItemAPI, getUserItemsAPI, deleteItemAPI } from '../apiCalls/item';
import { Props } from '../components/TableComp';

export const Home: React.FC = () => {
  let [tableData, setTableData] = useState<Props['tableData']>([]);
  let [loading, setLoading] = useState<boolean>(true);
  const addNewItem = (item: any) => {
    // console.log('P comp: ', item);
    //Make post api call to add item
    addItemAPI(item);
  };
  const deleteItem = (key: string) => {
    const newData = tableData.filter((item) => item.key !== key);
    setTableData(newData);
    deleteItemAPI(key);
    // console.log('P comp DEL key: ', key);
  };
  useEffect(() => {
    setLoading(true);
    getUserItemsAPI().then((ItemsData) => {
      // console.log('items form API', ItemsData);

      const tempTableData = ItemsData.map((obj: any) => {
        return {
          key: obj.id,
          name: obj.name,
          url: obj.url,
          price: obj.price,
        };
      });
      setTableData(tempTableData);
      // console.log('new TAB DATA: ', tableData);
    });
    setLoading(false);
  }, []);

  return (
    <>
      <DrawerComp addNewItem={addNewItem} />
      <div className='site-layout-content'>
        <TableComp
          tableData={tableData}
          deleteItem={deleteItem}
          loading={loading}
        />
      </div>
    </>
  );
};
