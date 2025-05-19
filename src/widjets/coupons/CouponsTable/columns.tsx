'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";

export const productColumns: GridColDef[] = [
  {
    field: '+',
    headerName: '',
    width: 60,
    renderCell: (props) => <EditButton path={`/admin/other/coupons/edit/${props.id}`} />,
    renderHeader: () => <AddButton path='/admin/other/coupons/create' />,
    align: 'center',
    display: 'flex',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'value',
    headerName: 'Значение',
    flex: 1,
  },
  {
    field: 'discount',
    headerName: 'Скидка',
    minWidth: 100,
    maxWidth: 100,
  },
  {
    field: 'personId',
    renderCell: (props) => <>{props.row.person?.secondName} {props.row.person?.firstName}</>,
    headerName: 'Пользователь',
    // flex: 1,
    width: 200,
    maxWidth: 200,
  },
]