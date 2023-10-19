import React from 'react'
import Columns from './Columns'
import Rows from './Rows'
import TablePagination from './TablePagination'
import { Box } from '@mui/material'

const TableContent: React.FC = () => {
  return (
    <Box sx={{}}>
        <Columns />
        <Rows />
        <TablePagination /> 
    </Box>
  )
}

export default TableContent