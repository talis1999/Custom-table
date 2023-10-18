import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';

import { Row, setRows } from '../features/data'; 
import { Column } from '../features/columns';

interface CustomTableProps {
    columns: Column[];
    data: Row[];
}

const rowStyle: React.CSSProperties = { 
  padding: '16px 24px',
  border: '1px #36454f solid',
  margin: '5px',
  position: 'relative',
  width: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#FAF9F6',
  color: '#71797E'
};

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRows([
      { id: 'aaa', name: 'Alex' },
      { id: 'bbb', name: 'Colin' },
      { id: 'ccc', name: 'Marry' }
    ]))
  }, [])
  
  return (
    <div>
      <h2>CustomTable</h2>
      {Boolean(data.length) && data.map(row => (<div style={rowStyle}>{row.name}</div>))}
    </div>
  )
}

export default CustomTable


