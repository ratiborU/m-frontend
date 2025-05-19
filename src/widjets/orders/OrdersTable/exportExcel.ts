import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { parseDate } from '@/lib/helpers/parseDate';
import { TOrder } from '@/services/api/orders/orderType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportExcel = async (data: TOrder[], fileName: string) => {
  console.log(data);
  // 1. Create a new workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data Report');

  // 2. Define the table headers
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'ФИО', key: 'person', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Телефон', key: 'phone', width: 16 },
    { header: 'Адрес', key: 'address', width: 30 },
    { header: 'Дата заказа', key: 'date', width: 16 },
    { header: 'Товары', key: 'products', width: 30 },
    { header: 'Количество', key: 'count', width: 24 },
    { header: 'Цена за единицу', key: 'prices', width: 24 },
    { header: 'Общая сумма', key: 'price', width: 16 },
    { header: 'Статус', key: 'status', width: 16 },
  ];

  // 3. Insert data into the worksheet
  data.forEach((order) => {
    worksheet.addRow({
      id: order.id,
      person: `${order.person?.secondName} ${order.person?.firstName} ${order.person?.fatherName}`,
      email: order.person?.email,
      phone: order.person?.phoneNumber,
      address: order.address,
      date: parseDate(order.createdAt),
      products: order.order_products?.map(x => x.product.name).join('; '),
      count: order.order_products?.map(x => x.count).join('; '),
      prices: order.order_products?.map(x => Number(x.product.price) - Number(x.product.discount)).join('; '),
      price: order.price,
      status: order.status,
    });
  });

  // 4. Style the header
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center' };
  });

  // 5. Save the workbook as an Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}.xlsx`);
  console.log('export 2');
}