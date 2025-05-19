'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";

export const productColumns: GridColDef[] = [
  {
    field: '+',
    headerName: '',
    width: 60,
    renderCell: (props) => <EditButton path={`/admin/other/categories/edit/${props.id}`} />,
    renderHeader: () => <AddButton path='/admin/other/categories/create' />,
    align: 'center',
    display: 'flex',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'name',
    headerName: 'Название',
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Описание',
    // minWidth: 100,
    // maxWidth: 100,
    flex: 1,
  }
]