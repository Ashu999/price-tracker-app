import { TableComp } from '../components/TableComp';
import { DrawerComp } from '../components/DrawerComp';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <>
      <DrawerComp />
      <div className='site-layout-content'>
        <TableComp />
      </div>
    </>
  );
};
