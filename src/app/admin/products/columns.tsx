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
    field: 'id',
    headerName: 'Id',
    width: 80,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'name',
    headerName: 'Заголовок',
    // width: 200,
    flex: 1,
    minWidth: 160
  },
  {
    field: 'description',
    headerName: 'Описание',
    // width: 50,
    flex: 2,
    minWidth: 100
  },
  // {
  //   field: 'characteristics',
  //   headerName: 'Характеристики',
  //   // width: 50,
  //   flex: 2,
  //   minWidth: 100
  // },
  {
    field: 'price',
    headerName: 'Цена',
    width: 80,
  },
  {
    field: 'discount',
    headerName: 'Скидка',
    width: 80,
  },
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
]