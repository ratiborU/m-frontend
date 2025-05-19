'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";

export const productColumns: GridColDef[] = [
  {
    field: '+',
    headerName: '',
    width: 60,
    renderCell: (props) => <EditButton path={`/admin/products/edit/${props.id}`} />,
    renderHeader: () => <AddButton path='/admin/products/create' />,
    align: 'center',
    display: 'flex',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'name',
    headerName: 'Заголовок',
    // width: 200,
    flex: 2,
    minWidth: 160
  },
  {
    field: 'category',
    headerName: 'Категория',
    renderCell: (props) => props.row.category.name,
    // width: 50,
    flex: 1,
    minWidth: 120
  },
  {
    field: 'price',
    headerName: 'Цена',
    renderCell: (props) => Number(props.row.price - props.row.discount),
    width: 80,
  },
  // {
  //   field: 'discount',
  //   headerName: 'Скидка',
  //   width: 80,
  // },
  {
    field: 'rate',
    headerName: 'Оценка',
    width: 80,
  },
  {
    field: 'commentsCount',
    headerName: 'Комментарии',
    width: 100,
  },
  {
    field: 'productsCount',
    headerName: 'На складе',
    width: 100,
  },
]