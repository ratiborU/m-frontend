'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";

export const productColumns: GridColDef[] = [
  {
    field: '+',
    headerName: '',
    width: 60,
    renderCell: (props) => <EditButton path={`/admin/comments/edit/${props.id}`} />,
    renderHeader: () => <AddButton path='/admin/comments/create' />,
    align: 'center',
    display: 'flex',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  // {
  //   field: 'id',
  //   headerName: 'Id',
  //   width: 80,
  //   align: 'center',
  //   headerAlign: 'center'
  // },
  {
    field: 'text',
    headerName: 'Текст',
    // width: 200,
    flex: 1,
    // minWidth: 160
  },
  {
    field: 'rate',
    headerName: 'Оценка',
    // flex: 1,
    minWidth: 100,
    maxWidth: 100,
  },
  // {
  //   field: 'characteristics',
  //   headerName: 'Характеристики',
  //   // width: 50,
  //   flex: 2,
  //   minWidth: 100
  // },
  {
    field: 'createdAt',
    headerName: 'Дата',
    // flex: 1,
    // width: 120,
  },
  {
    field: 'productId',
    renderCell: (props) => <>{props.row.product.name}</>,
    headerName: 'Продукт',
    // flex: 1,
    // width: 80,
  },
  {
    field: 'personId',
    renderCell: (props) => <>{props.row.person.secondName} {props.row.person.firstName}</>,
    headerName: 'Пользователь',
    // flex: 1,
    width: 200,
    maxWidth: 200,
  },
]