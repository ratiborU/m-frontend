'use client'

import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from "@mui/x-data-grid";
// import { TProduct } from '@/services/types/productType';
import styles from './baseGrid.module.css'

type BaseGridProps = {
  columns: GridColDef[],
  data: object[],
  width?: string,

}

const BaseGrid = (props: BaseGridProps) => {
  const { columns, data, width = "1080px" } = props;

  return (
    <DataGrid
      columns={columns}
      rows={data}
      disableRowSelectionOnClick
      disableMultipleRowSelection
      pageSizeOptions={[10, 20, 100]}
      className={styles.table}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      sx={{
        "width": width,
        "maxWidth": "100%",
        "minWidth": "40%",
        margin: '0 auto',
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
    />
  );
};

export default BaseGrid;