'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";
import { parseDate } from "@/lib/helpers/parseDate";

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
    minWidth: 240
  },

  {
    field: 'address',
    headerName: 'Адрес',
    flex: 1,
    width: 240,
  },
  {
    field: 'price',
    headerName: 'Сумма',
    // width: 50,
    // flex: 2,
    width: 120,
  },
  {
    field: 'delivery',
    headerName: 'Доставка',
    width: 80,
  },
  {
    field: 'createdAt',
    headerName: 'Дата заказа',
    renderCell: (props) => <>{parseDate(props.row.createdAt)}</>,
    width: 120,
  },
  // {
  //   field: 'deliveryDays',
  //   headerName: 'доставка в днях',
  //   width: 80,
  // },
  // {
  //   field: 'comment',
  //   headerName: 'Комментарии',
  //   width: 100,
  // },
  {
    field: 'status',
    headerName: 'Статус',
    width: 120,
  },
]