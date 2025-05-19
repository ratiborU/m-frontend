import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// import { parseDate } from '@/lib/helpers/parseDate';
import { TProduct } from '@/services/api/products/productType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportExcel = async (data: TProduct[], fileName: string) => {
  console.log(data);
  // 1. Create a new workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data Report');

  // 2. Define the table headers
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Название', key: 'name', width: 30 },
    { header: 'Категория', key: 'category', width: 24 },
    { header: 'Цена', key: 'price', width: 16 },
    { header: 'Оценка', key: 'rate', width: 16 },
    { header: 'Комментарии', key: 'comments', width: 16 },
    { header: 'В наличии', key: 'count', width: 16 },
    { header: 'Продано', key: 'sells', width: 16 },
  ];

  // 3. Insert data into the worksheet
  data.forEach((product) => {
    worksheet.addRow({
      id: product.id,
      name: product.name,
      category: product.category.name,
      price: Number(product.price) - Number(product.discount),
      rate: product.rate,
      comments: product.commentsCount,
      count: product.productsCount,
      sells: product.sellCount,
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