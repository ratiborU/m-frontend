'use client'
import { GridColDef } from "@mui/x-data-grid";
import EditButton from "@/components/EditButton/EditButton";
import AddButton from "@/components/AddButton/AddButton";

export const productColumns: GridColDef[] = [
  {
    field: '+',
    headerName: '',
    width: 60,
    renderCell: (props) => <EditButton path={`/admin/persons/edit/${props.id}`} />,
    renderHeader: () => <AddButton path='/admin/persons/create' />,
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
    field: 'secondName',
    headerName: 'Фамилия',
    // width: 200,
    flex: 1,
    minWidth: 100
  },
  {
    field: 'firstName',
    headerName: 'Имя',
    // width: 50,
    flex: 1,
    minWidth: 100
  },
  {
    field: 'fatherName',
    headerName: 'Отчество',
    // width: 50,
    flex: 1,
    minWidth: 100
  },
  {
    field: 'email',
    headerName: 'Почта',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'phoneNumber',
    headerName: 'Телефон',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'role',
    headerName: 'Роль',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'createdAt',
    headerName: 'Создан',
    minWidth: 120,
    renderCell: (props) => props.row.createdAt.slice(0, 10),
  },
]