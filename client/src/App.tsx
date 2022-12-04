import React from 'react';
import 'antd/dist/antd.css';
import { AppLayout } from './layout/AppLayout';
import './app.css';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

function App() {
  return (
    <div>
      <SessionAuth>
        <AppLayout />
      </SessionAuth>
    </div>
  );
}

export default App;
