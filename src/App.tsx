import React from 'react';
import { useAppSelector } from './app/hooks';

import { selectRows } from './features/data';

import CustomTable from './components/CustomTable';

function App() {

  const data = useAppSelector(selectRows);

  return (
    <div className="App">
      <h1>Hello !</h1>
      <CustomTable columns={[]} data={data}/>
    </div>
  );
}

export default App;
