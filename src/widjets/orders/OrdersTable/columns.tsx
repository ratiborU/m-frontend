'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";

export const orderColumns: GridColDef[] = [
  {
    field: '+',
    headerName: '',
    width: 60,
    renderCell: (props) => <EditButton path={`/admin/orders/edit/${props.id}`} />,
    renderHeader: () => <AddButton path='/admin/orders/create' />,
    align: 'center',
    display: 'flex',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'personId',
    renderCell: (props) => <>{props.row.person.secondName} {props.row.person.firstName}</>,
    // renderCell: (props) => <></>,
    headerName: 'ФИО',
    flex: 1,
    minWidth: 160
  },
  {
    field: 'price',
    headerName: 'Сумма',
    // width: 50,
    flex: 2,
    minWidth: 100
  },
  {
    field: 'address',
    headerName: 'Адрес',
    width: 80,
  },
  {
    field: 'delivery',
    headerName: 'Доставка',
    width: 80,
  },
  {
    field: 'deliveryDays',
    headerName: 'доставка в днях',
    width: 80,
  },
  {
    field: 'comment',
    headerName: 'Комментарии',
    width: 100,
  },
  {
    field: 'status',
    headerName: 'статус',
    width: 100,
  },
]