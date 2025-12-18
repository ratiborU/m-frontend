'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";
import { parseDate } from "@/lib/helpers/parseDate";

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
  {
    field: 'text',
    headerName: 'Текст',
    minWidth: 100,
    flex: 3,
  },
  {
    field: 'personId',
    renderCell: (props) => <>{props.row.person.secondName} {props.row.person.firstName}</>,
    headerName: 'Пользователь',
    width: 200,
    maxWidth: 320,
    minWidth: 100,
    flex: 2,
  },
  {
    field: 'productId',
    renderCell: (props) => <>{props.row.product.name}</>,
    headerName: 'Продукт',
    minWidth: 100,
    flex: 2,
  },
  {
    field: 'rate',
    headerName: 'Оценка',
    minWidth: 40,
    maxWidth: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Дата',
    renderCell: (props) => <>{parseDate(props.row.createdAt)}</>,
    width: 160,
  },


]