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
    width: 40,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'secondName',
    headerName: 'ФИО',
    renderCell: (props) => `${props.row.secondName} ${props.row.firstName} ${props.row.fatherName}`,
    // width: 200,
    flex: 1,
    minWidth: 160
  },
  // {
  //   field: 'secondName',
  //   headerName: 'Фамилия',
  //   // width: 200,
  //   flex: 1,
  //   minWidth: 100
  // },
  // {
  //   field: 'firstName',
  //   headerName: 'Имя',
  //   // width: 50,
  //   flex: 1,
  //   minWidth: 100
  // },
  // {
  //   field: 'fatherName',
  //   headerName: 'Отчество',
  //   // width: 50,
  //   flex: 1,
  //   minWidth: 100
  // },
  {
    field: 'email',
    headerName: 'Почта',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'phoneNumber',
    headerName: 'Телефон',
    // flex: 1,
    width: 100,
    minWidth: 100,
  },
  {
    field: 'role',
    headerName: 'Роль',
    // flex: 1,
    width: 80,
    minWidth: 80,
  },
  {
    field: 'createdAt',
    headerName: 'Создан',
    minWidth: 130,
    renderCell: (props) => parseDate(props.row.createdAt),
  },
]