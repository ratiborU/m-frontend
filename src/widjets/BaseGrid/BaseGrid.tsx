'use client'

import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from "@mui/x-data-grid";
// import { TProduct } from '@/services/types/productType';

type BaseGridProps = {
  columns: GridColDef[],
  data: object[];
}

const BaseGrid = (props: BaseGridProps) => {
  const { columns, data } = props;

  return (
    <DataGrid
      columns={columns}
      rows={data}
      disableRowSelectionOnClick
      disableMultipleRowSelection
      pageSizeOptions={[10, 20, 100]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
    />
  );
};

export default BaseGrid;